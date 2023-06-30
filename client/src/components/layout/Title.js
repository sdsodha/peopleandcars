const getStyles = () => ({
    title: {
        fontSize: 55,
        padding: '15px',
        marginBottom: '50px',
        color:'blue'
      
    }
})

const Title = () => {
    const styles = getStyles();

    return <h1 style={styles.title}>People and Cars</h1>
}

export default Title;