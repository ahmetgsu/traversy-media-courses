import React from 'react';
import PropTypes from 'prop-types';

const ContactItem = ({ contact }) => {
  const { _id, name, email, phone, type } = contact;

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {/* First check if there is an email, if so list it */}
        {/* email ? () : null is equvalent of the below expression*/}
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {/* First check if there is a phone number, if so list it */}
        {/* phone ? () : null is equvalent of the below expression*/}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          // onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button
          className='btn btn-danger btn-sm'
          // onClick={onDelete}
        >
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
