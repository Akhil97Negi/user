

const DeleteUser = ({onConfirm, onCancel}) =>{
    return (
        <div>
            <p>Are you sure you want to delete this user?</p>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>No</button>
        </div>
    )
}

export default DeleteUser 