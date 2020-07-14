import fecha from 'fecha';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Badge from './Badge';
import Button from './Button';
import CardHeader from './CardHeader';
import CardTitle from './CardTitle';
import NoteType from './TypeHelpers/NoteType';

// TODO extract to date helper, i18n:
const format = (date: Date | number, dateFormat: string) => fecha.format(date, dateFormat);

const timezone = (date: Date) => date.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2];

type NoteHeaderProps = {
  note: Omit<NoteType, 'text'>,
  dateFormat: string,
  // TODO shortDateFormat ?
  showTimezone?: boolean,
  onDelete?: (note: Omit<NoteType, 'text'>) => void,
  onEdit?: (note: Omit<NoteType, 'text'>) => void,
}

const NoteHeader: React.FunctionComponent<NoteHeaderProps> = ({
  ...props
}) => {
  const { dateFormat, note, onDelete, onEdit, showTimezone } = props;
  const { date, edited, from, title } = note;

  const headerClassNames = classnames(
    'd-flex',
    'flex-wrap',
    'align-items-center',
    'justify-content-between',
    'py-2',
    'pr-2',
    'bg-info'
  );

  return (
    <CardHeader className={headerClassNames}>
      <div className="d-inline-flex align-items-center">
        {edited && <Badge color="primary" className="text-uppercase mr-2 js-note-header__edited">Edited</Badge>}
        <div className="d-flex flex-column">
          {title && <CardTitle>{title}</CardTitle>}
          <span className="m-0 my-1 mr-auto">
            <span className="d-none d-sm-inline">
              {edited ? 'Last edited' : 'Posted'}
              {from ? <span className="js-note-header__from">{` by ${from}`}</span> : ' '} on <span className="js-note-header__date">{format(date, dateFormat)}{showTimezone && ` ${timezone(date)}`}</span>
            </span>
            <span className="d-sm-none">
              {from ? <span>{from} </span> : null}<span className="js-note-header__shortDate">{format(date, 'M/D/YY h:mm A')} {timezone(date)}</span>
            </span>
          </span>
        </div>
      </div>
      <div className="d-inline-flex">
        {onEdit ? <Button color="link" onClick={() => onEdit(note)} className="js-note-header__edit mr-3 p-0">edit</Button> : null}
        {onDelete ? <Button color="link" onClick={() => onDelete(note)} className="js-note-header__delete p-0">delete</Button> : null}
      </div>
    </CardHeader>
  );
};

NoteHeader.displayName = 'NoteHeader';

NoteHeader.propTypes = {
  note: PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    edited: PropTypes.bool,
    from: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  dateFormat: PropTypes.string.isRequired,
  // TODO shortDateFormat ?
  showTimezone: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};


export default NoteHeader;
