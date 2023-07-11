"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    useEffect(() => {
        const getPrompt = async () => {
            const res = await fetch(`/api/prompt/${promptId}`);
            const data = await res.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag
            });
        }

        if (promptId) getPrompt();
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();

        setSubmitting(true);

        if (!promptId) {
            return alert('No prompt ID found');
        }

        try {
            const res = await fetch(`api/prompt/${promptId}`,{
                method: 'PATCH',
                body: JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag,
                }),
            })
            console.log(res);
            if (res.ok) {
                router.push('/');
            }
        } catch (err){
            console.log(err);
        } finally {
            setSubmitting(false);
        }
    }

    return ( 
        <Form 
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
     );
}
 
export default EditPrompt;