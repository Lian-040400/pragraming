import  request  from "../additional_function/request";
import * as action_type from './action_type';
import {history} from '../additional_function/history';
import {requestWithoutToken} from "../additional_function/storage";

const apiHost=process.env.REACT_APP_API_HOST;

export function getTasks(params={}){
    const query=Object.entries(params).map(([key,value])=>`${key}=${value}`).join('&');

    return(dispatch)=>{

        request(`${apiHost}/task?${query}`)
        .then((tasks)=>{
            if(!tasks) return;
             dispatch({type:action_type.GET_TASKS,tasks});
        })
        .catch((error)=>{
            dispatch({type:action_type.ERROR,error:error.message});
        });
    }
}

export function getTask(taskId){

    return(dispatch)=>{
        request(`${apiHost}/task/${taskId}`)
        .then((task)=>{
            if(!task) return;
             dispatch({type:action_type.GET_TASK,task});
        })
        .catch((error)=>{
            dispatch({type:action_type.ERROR,error:error.message});
        });
    }
}

export function addTasks(newTask){
    return(dispatch)=>{
        dispatch({type:action_type.PENDING});
        request(`${apiHost}/task`,'POST',newTask)
        .then((task)=>{
            if(!task) return;
            dispatch({type:action_type.ADD_TASKS,task:task})
        })
        .catch((error)=>{
            dispatch({type:action_type.ERROR,error:error.message});
        });
    }


}
export function deleteTask(deletedTaskId,from){
    return(dispatch)=>{
        dispatch({type:action_type.PENDING});
        request(`${apiHost}/task/${deletedTaskId}`,'DELETE')
        .then((res)=>{
            if(!res) return;
            dispatch({type:action_type.DELETED_TASK,deletedTaskId,from});
             if(from==="single"){
                history.push("/");
            }
        })
         .catch((error)=>{
            dispatch({type:action_type.ERROR, error:error.message});
         });
    }
}

  
export function deleteTasks(deletedTaskId){
    return(dispatch)=>{
        dispatch({type:action_type.PENDING});
        request(`${apiHost}/task`,'PATCH',{tasks:[...deletedTaskId]})
        .then((res)=>{
            if(!res) return;
            dispatch({type:action_type.DELETED_TASKS,deletedTaskId})
        })
         .catch((error)=>{
            dispatch({type:action_type.ERROR,error:error.message});
        });
    }
}

export function editTask(data,from){
    return(dispatch)=>{
        dispatch({type:action_type.PENDING});
        request(`${apiHost}/task/${data._id}`,'PUT',data)
        .then((editedTask)=>{
            if(!editedTask) return;
            dispatch({type:action_type.EDITED_TASK,editedTask,from,status:data.status})
        })
        .catch((error)=>{
            dispatch({type:action_type.ERROR,error:error.message});
        });;
    }
}

export function sendContactFormData(data){
    return(dispatch)=>{
        dispatch({type:action_type.PENDING});
        requestWithoutToken(`${apiHost}/form`,'POST',data)
        .then(()=>{
            dispatch({type:action_type.SEND_CONTACT_FORM_DATA})
        })
        .catch((error)=>{
            dispatch({type:action_type.ERROR,error:error.message});
        });;
    }
}
export function sendRegisterData(data){
    return(dispatch)=>{
        dispatch({type:action_type.PENDING});
        requestWithoutToken(`${apiHost}/user`,'POST',data)
        .then(()=>{
            
            dispatch({type:action_type.SEND_REGISTER_DATA});
            history.push("/login");
        })
        .catch((error)=>{
            dispatch({type:action_type.ERROR,error:error.message});
        });;
    }
}


export function sendLoginData(data){
    return(dispatch)=>{
        dispatch({type:action_type.PENDING});
        requestWithoutToken(`${apiHost}/user/sign-in`,'POST',data)
        .then((res)=>{
            localStorage.setItem("token",JSON.stringify(res));
            dispatch({type:action_type.SEND_LOGIN_DATA});
            history.push("/");
        })
        .catch((error)=>{
            dispatch({type:action_type.ERROR,error:error.message});
        });;
    }
}
