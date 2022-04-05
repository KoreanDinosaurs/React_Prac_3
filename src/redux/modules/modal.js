import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// action
const VIEW_MODAL = "VIEW_MODAL"

// actionCreators
export const viewModal = createAction(VIEW_MODAL, (click) => ({click}))

// initial state
const initialState = {
    click: "none",
}

// reducer
export default handleActions(
    {
        [VIEW_MODAL]: (state, action) => produce(state, (draft) => {
            draft.click = action.payload.click
        })
    }   
, initialState)

