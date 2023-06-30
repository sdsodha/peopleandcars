import { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@apollo/client';
import { ADD_PERSON, GET_PEOPLE } from '../../queries'

const AddPerson = () => {
    const [id] = useState(uuidv4());
    const [addPerson] = useMutation(ADD_PERSON);

    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = values => {
        const { firstName, lastName} = values;
        
        addPerson({
            variables: {
                id,
                firstName,
                lastName
            },
            update: (cache, { data: { addPerson } }) => {
                const data = cache.readQuery({ query: GET_PEOPLE})
                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                        ...data,
                        people: [...data.people, addPerson]
                    }
                })
            }
        });

        form.resetFields();
    }

    return (
        <>
        <h1>Add Person</h1>
        <Form
            form={form} 
            onFinish={onFinish}
            name='add-person-form' 
            layout='inline' size='medium' 
            style={{marginBottom: '15px'}}>
            <Form.Item name='firstName'
               rules={[{ required: true, message: 'Please input first name!'}]}>
                <Input placeholder='John' />
            </Form.Item>
            <Form.Item name='lastName'
               rules={[{ required: true, message: 'Please input last name!'}]}>
                <Input placeholder='Smith' />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button type='primary' htmlType='submit'>
                        Add Person
                    </Button>
                )}
            </Form.Item>
        </Form>
        </>
    )
}

export default AddPerson