import { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import RemovePerson from '../buttons/RemovePerson'
import UpdatePerson from '../forms/UpdatePerson'
import Car from '../lists/Car'
import { Link } from 'react-router-dom'

const getStyles = () => ({
    card: {
        width: '1100px',
        backgroundColor: '#f0f2f5',
        fontSize: 20,
        fontWeight: '700',
    },
    link:{
        color:'#1890ff',
        fontSize:'16px'
    },
    heading:{
        
        fontSize:'20px'
    }
})

const Person = props => {
    const { id, firstName, lastName, people } = props;
    const styles = getStyles();

    const [editMode, setEditMode] = useState(false);

    const handleButtonClick = () => setEditMode(!editMode);

    return (
        <>
            {editMode ?
                <UpdatePerson 
                id={id}
                firstName={firstName}
                lastName={lastName}
                onButtonClick={handleButtonClick} />
                :
                <Card style={styles.card}
                    actions={[
                        <EditOutlined key='edit' onClick={handleButtonClick} />,
                        <RemovePerson id={id} />
                    ]}>
                    <p style={styles.heading}>{firstName} {lastName}</p>
                    <Car id={id} people={people} />
                    <Link style={styles.link} to={`/people/${id}`}>Learn More</Link>
                </Card>
            }
        </>
    )
}

export default Person;