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
    <Card style={{ width: '28rem', height: '28rem', marginTop: '3rem' }}>
      <div className="d-flex justify-content-center mt-2">
        <Card.Img variant="top" src={recordObj.image} style={{ width: '18rem', height: '18rem' }} />
      </div>
      <Card.Body>
        <Card.Title>{recordObj.title}</Card.Title>
        <Card.Title>{recordObj.artist}</Card.Title>
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-column">
            <Card.Subtitle>{recordObj.genre}</Card.Subtitle>
            <Card.Subtitle>Release Date: {recordObj.created_at}</Card.Subtitle>
            {recordObj.is_official ? <Card.Subtitle>OFFICIAL RECORD</Card.Subtitle> : <Card.Subtitle>UNOFFICIAL RECORD</Card.Subtitle>}
          </div>
          <div className="d-flex ">
            <Link href={`/record/${recordObj.firebaseKey}`} passHref>
              <Button variant="primary">View</Button>
            </Link>
            {recordObj.uid === user.uid ? (
              <>
                <Button variant="danger" onClick={removeRecord}>
                  Delete
                </Button>
                <Link href={`/record/edit/${recordObj.firebaseKey}`} passHref>
                  <Button variant="warning">Edit</Button>
                </Link>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RecordCard;

RecordCard.propTypes = {
  recordObj: PropTypes.shape({
    artist: PropTypes.string,
    created_at: PropTypes.string,
    firebaseKey: PropTypes.string,
    genre: PropTypes.string,
    image: PropTypes.string,
    is_official: PropTypes.bool,
    title: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
