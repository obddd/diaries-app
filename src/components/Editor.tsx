import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import Markdown from 'markdown-to-jsx';
import http from '../api/api';
import { Entry } from '../interfaces/entry.interface';
import { Diary } from '../interfaces/diary.interface';
import { setCurrentlyEditing, setCanEdit } from '../redux/entry/editorSlice';
import { updateDiary } from '../redux/diary/diarySlice';
import { updateEntry } from '../redux/entry/entrySlice';
import { showAlert } from '../util';
import { useAppDispatch } from '../redux/store';

const Editor: FC = () => {
  const { currentlyEditing: entry, canEdit, activeDiaryId } = useSelector(
    (state: RootState) => state.editor
  );
  const [editedEntry, updateEditedEntry] = useState(entry);
  const dispatch = useAppDispatch();

  const saveEntry = async () => {
    if (activeDiaryId == null) {
      return showAlert('Please select a diary.', 'warning');
    }
    if (entry == null) {
      http
        .post<Entry, { diary: Diary; entry: Entry }>(
          `/diaries/entry/${activeDiaryId}`,
          editedEntry
        )
        .then((data) => {
          if (data != null) {
            const { diary, entry: _entry } = data;
            dispatch(setCurrentlyEditing(_entry));
            dispatch(updateDiary(diary));
          }
        });
    } else {
      http
        .put<Entry, Entry>(`diaries/entry/${entry.id}`, editedEntry)
        .then((_entry) => {
          if (_entry != null) {
            dispatch(setCurrentlyEditing(_entry));
            dispatch(updateEntry(_entry));
          }
        });
    }
    dispatch(setCanEdit(false));
  };

  useEffect(() => {
    updateEditedEntry(entry);
  }, [entry]);

  return (
    <div className="editor">
      <header
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: '0.2em',
          paddingBottom: '0.2em',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        {entry && !canEdit ? (
          <h4>
            {entry.title}
            <a
              href="#edit"
              onClick={(e) => {
                e.preventDefault();
                if (entry != null) {
                  dispatch(setCanEdit(true));
                }
              }}
              style={{ marginLeft: '0.4em' }}
            >
              (Edit)
            </a>
          </h4>
        ) : (
          <input
            value={editedEntry?.title ?? ''}
            disabled={!canEdit}
            onChange={(e) => {
              if (editedEntry) {
                updateEditedEntry({
                  ...editedEntry,
                  title: e.target.value,
                });
              }
            }}
          />
        )}
      </header>
      {entry && !canEdit ? (
        <Markdown>{entry.content}</Markdown>
      ) : (
        <>
          <textarea
            disabled={!canEdit}
            placeholder="Supports markdown!"
            value={editedEntry?.content ?? ''}
            onChange={(e) => {
              if (editedEntry) {
                updateEditedEntry({
                  ...editedEntry,
                  content: e.target.value,
                });
              }
            }}
          />
          <button onClick={saveEntry} disabled={!canEdit}>
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default Editor;
