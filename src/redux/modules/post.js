import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { collection, getDocs, addDoc, doc, updateDoc, orderBy, query, limit, Firestore, startAt, getDoc, startAfter } from "firebase/firestore";
import { db, storage } from "../../shared/firebase"
import moment from "moment";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { actionCreators as imageActions } from "./image";

// action
const SET_POST = "SET_POST"
const ADD_POST = "ADD_POST"
const EDIT_POST = "EDIT_POST"
const LOADING = "LOADING"

// action creators
const setPost = createAction(SET_POST, (post_list, paging) => ({post_list, paging}))
const addPost = createAction(ADD_POST, (post) => ({post}))
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id, post}))
const loading = createAction(LOADING, (is_loading) => ({is_loading}))


// middlewares
const getPostFB = (start = null, size = 3) => {
    return async function (dispatch, getState, {history}){
    
        dispatch(loading(true));
        
        const postRef = collection(db, "post");
        let q = query(postRef, orderBy("insert_dt", "desc"), limit(size + 1));
        
        if(start){
            q = query(postRef, orderBy("insert_dt", "desc"), startAt(start), limit(size + 1));
        }
        
        const querySnapshot = await getDocs(q);
        
        let paging = {
            start: querySnapshot.docs[0],
            next: querySnapshot.docs.length === size + 1 ? querySnapshot.docs[querySnapshot.docs.length -1] : null,
            size: size,
        }
        
        const post_list = []
        querySnapshot.forEach((doc) => {
            
            let _post = doc.data();
          
            let post = {
                id: doc.id,
                user_info: {
                    user_name: _post.user_name,
                    user_profile: _post.user_profile,
                    user_id: _post.user_id
                },
                image_url: _post.image_url,
                contents: _post.contents,
                comment_cnt: _post.comment_cnt,
                insert_dt: _post.insert_dt,
            }
            post_list.push(post)
        });
        paging.next && post_list.pop()
        dispatch(setPost(post_list, paging))
    }       
}

const getOnePostFB = (id) => {
    return async function (dispatch, getState, {history}){
            const docRef = doc(db, "post", id);
            const docSnap = await getDoc(docRef); 
            
            if (docSnap.exists()) {
                
                let _post = docSnap.data();
            
                let post = {
                    id: docSnap.id,
                    user_info: {
                        user_name: _post.user_name,
                        user_profile: _post.user_profile,
                        user_id: _post.user_id
                    },
                    image_url: _post.image_url,
                    contents: _post.contents,
                    comment_cnt: _post.comment_cnt,
                    insert_dt: _post.insert_dt,
                }
                
                dispatch(setPost([post]))
            }   
    }
}

const addPostFB = (contents = '') => {
    return async function (dispatch, getState, {history}){
        const _user = getState().user.user;
        
        const user_info = {
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile,
        }

        const _post = {
            ...initialPost,
            contents: contents,
        }
       
        const _image = getState().image.preview;
        const storageRef = ref(storage, `images/${user_info.user_id}_${new Date().getTime()}`);

        uploadString(storageRef, _image, 'data_url').then((snapshot) => {
            getDownloadURL(storageRef)
            .then((url) => {
                console.log(url)
                dispatch(imageActions.uploadImage(url))
                return url
            })
            .then(async(url) => {
                const docRef = await addDoc(collection(db, "post"), {
                    ...user_info,
                    ..._post,
                    image_url: url
                });
         
                let post ={user_info, ..._post, id: docRef.id, image_url: url}
                dispatch(addPost(post))
                history.replace('/')
                dispatch(imageActions.setPreview(null))
            })
            .catch((error) => {
                window.alert("포스트 작성에 문제가 있어요!");
                console.log("post작성에 문제가 있습니다.", error)
            });
        })
        .catch((error) => {
            console.log("이미지 업로드에 문제가 있습니다.", error);
            window.alert("이미지 업로드에 문제가 있어요!");
        })
    }
}

const editPostFB = (post_id = null, post = {}) => {
    return async function (dispatch, getState, {history}){
        
        if(!post_id){
            console.log("게시물 정보가 없어요.")
            return;
        }

        const _image = getState().image.preview;
        const _post_idx = getState().post.list.findIndex(p => p.id === post_id)
        const _post = getState().post.list[_post_idx];
        console.log(_post_idx, _post)

        if(_image === _post.image_url){
            const docRef = doc(db, "post", post_id);

            await updateDoc(docRef, post);
            dispatch(editPost(post_id, post))
            history.replace("/")
        } else {
            const user_id = getState().user.user.uid;

            const storageRef = ref(storage, `images/${user_id}_${new Date().getTime()}`);

            uploadString(storageRef, _image, 'data_url').then((snapshot) => {
                getDownloadURL(storageRef)
                .then((url) => {
                    console.log(url)
                    dispatch(imageActions.uploadImage(url))
                    return url
                })
                .then(async(url) => {
                    const docRef = doc(db, "post", post_id);
                    await updateDoc(docRef, {...post, image_url: url});
                    dispatch(editPost(post_id, {...post, image_url: url}))
                    history.replace("/")
                })
                .catch((error) => {
                    window.alert("포스트 작성에 문제가 있어요!");
                    console.log("post작성에 문제가 있습니다.", error)
                });
            })
            .catch((error) => {
                console.log("이미지 업로드에 문제가 있습니다.", error);
                window.alert("이미지 업로드에 문제가 있어요!");
            })                                                
        } 
    }
}

// initialState
const initialState = {
    list: [],
    paging: {start: null, next: null, size: 3},
    is_loading: false,
}

const initialPost = {
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToHXwJs8bT07WPe-0Akeu6bPfD4wvS-FSyyA&usqp=CAU",
    contents: "",
    comment_cnt: 0,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

// reducer
export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
            draft.list.push(...action.payload.post_list);

            // 중복제거
            draft.list = draft.list.reduce((acc, cur) => {
                if(acc.findIndex(a => a.id === cur.id) === -1){
                    return [...acc, cur]
                } else {
                    acc[acc.findIndex(a => a.id === cur.id)] = cur
                    return acc
                }
            },[])
            
            if(action.payload.paging){
            draft.paging = action.payload.paging;
            draft.is_loading = false;
            }
        }),
        
        [ADD_POST]: (state, action) => produce(state, (draft) => {
            draft.list.unshift(action.payload.post)
        }),

        [EDIT_POST]: (state, action) => produce(state, (draft) => {
            let idx = draft.list.findIndex(p => p.id === action.payload.post_id);
            draft.list[idx] = {...draft.list[idx], ...action.payload.post}
        }),

        [LOADING]: (state, action) => produce(state, (draft) => {
            draft.is_loading = action.payload.is_loading
        })

    }, initialState);

const actionCreators = {
    getPostFB,
    addPostFB,
    editPostFB,
    getOnePostFB,
}

export { actionCreators }