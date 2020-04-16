import { userConstants } from '../_contasts';
import { userService } from '../_services';
import { alertActions } from './';

export const userActions = {
    classify
};

function classify(url) {
    return dispatch => {
        dispatch(requestclassify({ url }));

        userService.classify(url)
            .then(
                data => {
                    dispatch(classifysuccess(data));
                },
                error => {
                    dispatch(classifyfailure(error.toString()));
                    //console.log(error.toString());
                    dispatch(alertActions.error('Oops! There was an error. Please try again, later.'));
                }
            );
    };
}

export const requestclassify = () => { return { type: userConstants.CLASSIFY_REQUEST } }
export const classifysuccess = (data) => { return { type: userConstants.CLASSIFY_SUCCESS, payload: data } }
export const classifyfailure = (errMess) => { return { type: userConstants.CLASSIFY_FAILURE, payload: errMess } }
