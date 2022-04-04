import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { storage } from "../../shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// actions
const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW"

// action creators
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({preview}));

// initial state
const initialState = {
    image_url: "",
    uploading: false,
    preview: "http://via.placeholder.com/400x300",
};

function uploadImageFB(image) {
    return function (dispatch, getState, {history}){
        dispatch(uploading(true))
        const imageRef = ref(storage, `images/${image.name}`);
        
        uploadBytes(imageRef).then((snapshot) => {
            console.log(snapshot)
            getDownloadURL(ref(storage, `images/${image.name}`))
            .then((url) => {
                console.log(url)
                dispatch(uploadImage(url))
            })
            .catch((error) => {
                console.log(error)
            });
        });
    }
}

// reducer
export default handleActions(
    {
        [UPLOADING]: (state, action) => produce(state, (draft) => {
            draft.uploading = action.payload.uploading;
        }),

        [UPLOAD_IMAGE]: (state, action) => produce(state, (draft) => {
            draft.image_url = action.payload.image_url;
            draft.uploading = false;
        }),

        [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
            draft.preview = action.payload.preview;
        })

    }, initialState
);

const actionCreators = {
    uploadImage,
    uploadImageFB,
    setPreview,
};
    
export { actionCreators };