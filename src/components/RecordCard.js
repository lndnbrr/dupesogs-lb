import Link from 'next/link';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAuth } from '@/utils/context/authContext';
import { deleteRecord } from '@/api/recordData';

function RecordCard({ recordObj, onUpdate }) {
  const removeRecord = () => {
    if (window.confirm(`Are you sure you want to delete "${recordObj.title}"?`)) {
      deleteRecord(recordObj.firebaseKey).then(() => onUpdate());
    }
  };

  const { user } = useAuth();

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={recordObj.image} />
      <Card.Body>
        <Card.Title>{recordObj.title}</Card.Title>
        <Card.Text>{recordObj.artist}</Card.Text>
        <Link href={`/record/${recordObj.firebaseKey}`} passHref>
          <Button variant="primary">View</Button>
        </Link>
        {recordObj.uid === user.uid ? (
          <>
            <Link href={`/record/edit/${recordObj.firebaseKey}`} passHref>
              <Button variant="warning">Edit</Button>
            </Link>
            <Button variant="danger" onClick={removeRecord}>
              Delete
            </Button>
          </>
        ) : (
          ''
        )}
      </Card.Body>
      {recordObj.is_official ? <Card.Text>OFFICIAL RECORD</Card.Text> : <Card.Text>UNOFFICIAL RECORD</Card.Text>}
      <Card.Text>{recordObj.created_at}</Card.Text>
    </Card>
  );
}

export default RecordCard;

RecordCard.propTypes = {
  recordObj: PropTypes.shape({
    artist: PropTypes.string,
    created_at: PropTypes.string,
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    is_official: PropTypes.bool,
    title: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
