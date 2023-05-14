import * as React from 'react'

type Props = {
    savePost: (e: React.FormEvent, formData: IPost) => void
}
const AddPost: React.FC<Props> = ({ savePost }) => {
    const [formData, setFormData] = React.useState<IPost>()
    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData((prevState) => ({
            ...prevState,
            [e.currentTarget?.id]: e.currentTarget?.value,
        } as IPost));
    };
    return (
        <form className='shadow-xl rounded px-8 pt-6 pb-8 mb-4 mt-4 flex flex-wrap flex-col space-y-5' onSubmit={(e) => savePost(e, formData as IPost)}>
            <div className='basis-1/2 space-y-5'>
                <div>
                    <label className='mr-2' htmlFor='name'>Title:</label>
                    <input className="shadow-inner rounded" onChange={handleForm} type='text' id='title' />
                </div>
                <div className='Form--field'>
                    <label className='mr-2' htmlFor='body'>Description:</label>
                    <input className='shadow-inner rounded'onChange={handleForm} type='text' id='body' />
                </div>
            </div>
            <button className=' w-1/6 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full' disabled={formData === undefined ? true : false} >
                Add Post
            </button>
        </form>
    )
}

export default AddPost