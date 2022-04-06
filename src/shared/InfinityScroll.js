import React, { useCallback, useEffect } from "react";
import _ from "lodash";
import { Spinner } from "../elements";

const InfinityScroll = (props) => {
    const {children, callNext, is_next, loading} = props;
    
    const _handleScroll = _.throttle(() => {
        const { innerHeight } = window;
        
        const scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );

        // 브라우저 호환성을 감안한 스크롤 계산!
        const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
        // console.log("scrollHeight :", scrollHeight, "innerHeight: ", innerHeight, "scrollTop :", scrollTop)
        if (scrollHeight - innerHeight - scrollTop < 200) {
        // 로딩 중이면 다음 걸 부르면 안되겠죠!
          if (loading) {
            return;
          }
            
            callNext();
        }

    }, 300);

    const handleScroll = useCallback(_handleScroll, [loading])

    useEffect(() => {
        if(loading){
            return;
        }

        if(is_next){
            window.addEventListener("scroll", handleScroll);
        } else {
            window.removeEventListener("scroll", handleScroll);
        }
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, [is_next, loading])

    return(
        <React.Fragment>
            {children}
            {is_next && <Spinner/>}
        </React.Fragment>
    )
}

InfinityScroll.defaultProps = {
    children: null,
    callNext: () => {},
    is_next: false,
    loading: false,
}

export default InfinityScroll;