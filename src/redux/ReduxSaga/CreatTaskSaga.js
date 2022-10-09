import { call, put, takeLatest } from "redux-saga/effects"
import { projectService } from "../../Services/ProjectService"
import { STATUS_CODE } from "../../utils/constain/setting";
import { Notification } from "../../utils/Notification/Notification";
import { CLOSE_FORM_DRAWER, CREATE_TASK_SAGA } from "../contains/contains";

function* createTaskSaga(action) {
  try {
    let { status } = yield call(() => projectService.createTask(action.taskObject));
    if (status === STATUS_CODE.SUCCESS) {
      Notification('success', 'Create task successfully !');
      yield put({
        type: CLOSE_FORM_DRAWER
      })

    }
  } catch (error) {
    console.log(error)
  }
}

export function* listenCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}