import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Copied = (PostUid, ProjectUrl) => toast.success('Link Copied', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    data: {
        url: ProjectUrl,
        p_uid: PostUid
    },
    type: "success"
});

const blogInputDescWarn = () => toast.warn('Please fill in Description', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: "warning"
});

const blogInputUrlWarn = () => toast.warn('Please fill in URL', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: "warning"
});

const deleteSuccess = (PostUid) => toast.success('Project Deleted', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: PostUid,
    type: "success"
});

const VProjectFlag = () => toast.success('Video post Processed successfully. You can view it in the projects tab', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: "success"
});

const qvpSuccess = (QvpUid, handleQvpSuccess) => toast.success('Your Quick Video Post is being Processed', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: QvpUid,
    onClose: () => {
        handleQvpSuccess();
    },
    type: "success"
});

const qvpProjectFlag = (QvpUid) => toast.success('Your Quick Video post processed successfully. You can view it in the projects tab', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: QvpUid,
    type: "success"
});

export {
    Copied,
    blogInputDescWarn,
    blogInputUrlWarn,
    deleteSuccess,
    VProjectFlag,
    qvpSuccess,
    qvpProjectFlag
}