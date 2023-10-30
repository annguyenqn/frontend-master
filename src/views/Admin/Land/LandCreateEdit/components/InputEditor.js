import { Editor } from '@tinymce/tinymce-react';
import classNames from 'classnames';
import Input from 'components/Input/Input';
import { API_TINY } from 'config/config';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

const InputEditor = ({ item }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={item.className}>
      {item.label && (
        <label htmlFor={item?.id}>
          <p className="mb-2">{item.label}</p>
        </label>
      )}
      <div className={item.className}>
        <Controller
          control={control}
          rules={item.rules}
          render={({ field: { onChange, value } }) => (
            <div className={classNames('border', errors?.[item.name]?.message ? 'border-red-400' : 'border-black-1')}>
              <Editor
                apiKey={API_TINY}
                value={value}
                init={{
                  height: 280,
                  menubar: false,
                  skin: 'oxide-dark',
                  content_css: 'dark',
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
                onEditorChange={onChange}
              />
            </div>
          )}
          name={item.name}
          defaultValue={item.defaultValue}
        />

        <Input.errorText message={errors?.[item.name]?.message} />
      </div>
    </div>
  );
};

InputEditor.propTypes = {
  item: PropTypes.any.isRequired,
};

export default InputEditor;
