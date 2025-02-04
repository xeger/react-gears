import React, { FC, useEffect, useRef } from 'react';
import Tribute, { TributeItem } from 'tributejs';
import Button from '../Button/Button';
import ButtonToolbar from '../Button/ButtonToolbar';
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import FormLabelGroup from '../Form/FormLabelGroup';
import Input from '../Input/Input';
import { Note } from './Note.types';
import NoteHeader from './NoteHeader';

type MentionableUser = {
  key: string;
  value: string;
  email: string;
};

type EditableNoteMentionsProps = {
  children?: React.ReactNode;
  className?: string;
  dateFormat?: string;
  showTimezone?: boolean;
  mentionableUsers: MentionableUser[] | undefined;
  note: Note;
  onCancel: (note: Note) => void;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>, note: Note) => void;
  onSave: (note: Note) => void;
  rows?: number;
  saving?: boolean;
  saveLabel?: React.ReactNode;
  savingLabel?: React.ReactNode;
};

export const EditableNoteMentionsDefaultProps = {
  className: 'bg-white mb-3',
  dateFormat: 'ddd, MMMM D, YYYY "at" h:mm A',
  mentionableUsers: [],
  rows: 4,
  saving: false,
  saveLabel: 'Save',
  savingLabel: 'Saving...',
  showTimezone: true,
};

const EditableNoteMentions: FC<EditableNoteMentionsProps> = ({
  className = EditableNoteMentionsDefaultProps.className,
  dateFormat = EditableNoteMentionsDefaultProps.dateFormat,
  mentionableUsers = EditableNoteMentionsDefaultProps.mentionableUsers,
  rows = EditableNoteMentionsDefaultProps.rows,
  saving = EditableNoteMentionsDefaultProps.saving,
  saveLabel = EditableNoteMentionsDefaultProps.saveLabel,
  savingLabel = EditableNoteMentionsDefaultProps.savingLabel,
  showTimezone = EditableNoteMentionsDefaultProps.showTimezone,
  ...props
}) => {
  const { children, note, onCancel, onChange, onSave } = props;
  const { errors, text } = note;
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (mentionableUsers.length > 0 && ref.current) {
      const tribute = new Tribute({
        allowSpaces: true,
        menuItemTemplate(item: TributeItem<any>) {
          return `${item.string}<span class="note__mention-email">${item.original.email}</span>`;
        },
        noMatchTemplate: () => '',
        selectClass: 'note__mention-highlight',
        selectTemplate(item) {
          if (ref.current) {
            const event = {
              target: { value: `${ref.current.value}${item.original.value}` },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(event, note);
          }
          return `@${item.original.value}`;
        },
        values: mentionableUsers,
      });
      tribute.attach(ref.current);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const mentionStyles = () => (
    <style jsx global>
      {`
        .tribute-container {
          background-color: red;
          position: absolute;
          top: 0;
          left: 0;
          height: auto;
          display: block;
          max-width: none !important;
          box-shadow: 0 0 1px #a0a0a0, 0 0 1.5em rgb(0 0 0 / 20%), inset 0 1px 0 #fff;
          border-radius: 4px;
          z-index: 999999;
          overflow: auto;
          max-height: 300px;
        }
        .tribute-container ul {
          margin: 0;
          padding: 0;
          list-style: none;
          background: #efefef;
        }
        .tribute-container li {
          padding: 8px;
          cursor: pointer;
        }
        .tribute-container span {
          font-weight: bold;
        }
        .tribute-container .menu-highlighted {
          font-weight: bold;
        }
        .note__mention-highlight {
          background: #5995db !important;
          color: #e3e3e3 !important;
        }
        .note__mention-email {
          font-weight: lighter !important;
          padding-left: 20px;
          padding-right: 3px;
          float: right;
          color: inherit;
        }
      `}
    </style>
  );

  return (
    <Card className={className}>
      <NoteHeader note={note} dateFormat={dateFormat} showTimezone={showTimezone} />
      <CardBody>
        <FormLabelGroup feedback={errors} stacked>
          <Input
            autoFocus
            className="js-editable-note_text"
            disabled={saving}
            rows={rows}
            innerRef={ref}
            invalid={!!errors}
            type="textarea"
            value={text}
            onChange={(event) => onChange(event, note)}
          />
          {mentionStyles()}
        </FormLabelGroup>
        {children}
        <ButtonToolbar className="mt-3 mb-0">
          <Button
            className="js-editable-note_save"
            color="primary"
            disabled={saving}
            onClick={() => onSave(note)}
          >
            {saving ? savingLabel : saveLabel}
          </Button>
          <Button
            className="js-editable-note_cancel"
            disabled={saving}
            onClick={() => onCancel(note)}
          >
            Cancel
          </Button>
        </ButtonToolbar>
      </CardBody>
    </Card>
  );
};

EditableNoteMentions.defaultProps = EditableNoteMentionsDefaultProps;
EditableNoteMentions.displayName = 'EditableNoteMentions';
export default EditableNoteMentions;
