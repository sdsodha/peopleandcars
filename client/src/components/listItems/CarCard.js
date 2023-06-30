import { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import RemoveCar from '../buttons/RemoveCar'
import UpdateCar from '../forms/UpdateCar'

const getStyles = () => ({
    card: {
        width: '100%',
        backgroundColor: 'lightgrey',
        color:'black',
        fontSize:'18px',
       
        
        
    },
    container:{
        width:'100%',
        backgroundColor:'red',
        flexWrap:'wrap',
        flexDirection:'column',
    },
    list: {
        display: 'flex',
        justifyContent: 'center',
    },
    data:{
        height:'20px',
        padding:'0',
        margin:'0'
    }
})

const CarCard = props => {
    const { id , make, model, year, price, personId , people } = props;
    const styles = getStyles();

    const [editMode, setEditMode] = useState(false);

    const handleButtonClick = () => setEditMode(!editMode);

    return (
        <>
            {editMode ?
                <UpdateCar 
                    id={id}
                    make={make}
                    model={model}
                    year={year}
                    price={price}
                    personId={personId}
                    people={people}
                    onButtonClick={handleButtonClick} />
                    :
                    
            <Card style={styles.card}
                actions={[
                    <EditOutlined key='edit' onClick={handleButtonClick} />,
                    <RemoveCar id={id} personId={personId} />
                ]}>
                <p style={styles.data}>{make} {model} {year} -> ${price}</p>
            </Card>
         
    }
        </>
    )
}

export default CarCard;