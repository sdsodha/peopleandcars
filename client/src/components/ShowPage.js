import { useParams, Link } from "react-router-dom";
import { List, Card } from 'antd'
import { useQuery } from '@apollo/client'
import { GET_CARS } from '../queries'

const getStyles = () => ({
    card: {
        width: '500px',
        backgroundColor: 'lightgrey',
        borderRadius: '20px',
        
        
        
    },
    list: {
        display: 'flex',
        justifyContent: 'center',
    },
    heading:{
        fontWeight: 'bold',
        fontSize:'16px'
        
    },
    data:{
        fontWeight:'normal'
    }

})

const ShowPage = () => {
    const { id } = useParams();

    const styles = getStyles();

    const { loading, error, data } = useQuery(GET_CARS, {
        variables: { personId: id }
    });

    if (loading) return 'Loading...';
    if (error) return `Error from Cars component! ${error.message}`; 

    return (
        <>
            <div style={styles.list}><Link to='/' ><h1>Back to Home</h1></Link></div>
            <List grid={{gutter: 15, column: 1}} style={styles.list}>
            {data.personCars.map(({id, make, model, personId, price, year}) => (
                <List.Item key={id}>
                    <Card title={make} style={styles.card}>
                        <p style={styles.heading}>Model:  <span style={styles.data}> {model}</span></p>
                        <p style={styles.heading}>Year: <span style={styles.data}>{year}</span></p>
                        <p style={styles.heading}>Price: <span style={styles.data}>${price}</span></p>
                    </Card>
                </List.Item>
            ))}
            </List> 
        </>
    )
}

export default ShowPage;