import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db, storage } from "../../shared/firebase"
import moment from "moment";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { actionCreators as imageActions } from "./image";

// action
const SET_POST = "SET_POST"
const ADD_POST = "ADD_POST"

// action creators
const setPost = createAction(SET_POST, (post_list) => ({post_list}))
const addPost = createAction(ADD_POST, (post) => ({post}))


// middlewares
const getPostFB = () => {
    return async function (dispatch, getState, {history}){
        const querySnapshot = await getDocs(collection(db, "post"));
        
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
       
        dispatch(setPost(post_list))
    }
}

const addPostFB = (contents = '') => {
    return async function (dispatch, getState, {history}){
        const _user = getState().user.user;

        const user_info = {
            user_name: _user.user_name,
            user_id: _user.id,
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

// initialState
const initialState = {
    list: []
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
            draft.list = action.payload.post_list
        }),
        
        [ADD_POST]: (state, action) => produce(state, (draft) => {
            draft.list.unshift(action.payload.post)
        }),

    }, initialState);

const actionCreators = {
    getPostFB,
    addPostFB,
}

export { actionCreators }