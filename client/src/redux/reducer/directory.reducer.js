import { GET_DIRECTORY , DIRECTORY_ERROR } from '../actions/types'

const initialState = {
    data:null,
    loading:true
}

export const directory = (state=initialState,action) => {
    const { payload , type } = action

    switch(type){
        case GET_DIRECTORY:
            return {
                ...state,
                data:payload,
                loading:false
            }
        case DIRECTORY_ERROR:
            return {
                ...state,
                data:payload,
                loading:false
            } 
        default:
            return state
    }
}