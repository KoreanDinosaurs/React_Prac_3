import React from "react";
import { actionCreators as imageActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";

const Upload = (props) => {
    const dispatch = useDispatch();
    const fileInput = React.useRef();
    const uploading = useSelector(state => state.image.uploading)
    
    const selectFile = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        // 파일 내용을 읽어옵니다.
        reader.readAsDataURL(file);

        // 읽기가 끝나면 발생하는 이벤트 핸들러예요! :)
        reader.onloadend = () => {
        // reader.result는 파일의 컨텐츠(내용물)입니다!
        console.log(reader.result);
        dispatch(imageActions.setPreview(reader.result));
        };
    };

    // const uploadFB = () => {
    //     if (!fileInput.current || fileInput.current.files.length === 0) {
    //         window.alert("파일을 선택해주세요!");
    //         return;
    //     }

    //     dispatch(imageActions.uploadImageFB(fileInput.current.files[0]))
    // }

    return (
        <React.Fragment>
            <input type="file" ref={fileInput} onChange={selectFile} disabled={uploading}/>
            {/* <Button _onClick={uploadFB} >업로드하기</Button> */}
        </React.Fragment>
    );
};

export default Upload;