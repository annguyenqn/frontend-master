import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Preview from './Preview';
import Badge from 'components/Badge/Badge';
import Input from 'components/Input/Input';

const InputFile = ({ item }) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const files = watch(item?.id);
  const [filesListState, setFilesListState] = useState([]);

  const readAndSetFile = (file) => {
    // handle to preview image files in case upload files from local
    if (/\.(jpe?g|png)$/i.test(file?.name)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilesListState((preState) => [
          ...preState,
          {
            url: e.target.result,
            filename: file?.name,
            originalname: file?.name,
            type: file?.type,
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
    // handle to preview image files in case get data from api
    if (/\.(jpe?g|png)$/i.test(file?.filename)) {
      setFilesListState((preState) => [...preState, file]);
    }
    // handle to preview pdf files in case upload files from local
    if (/\.(pdf)$/i.test(file?.name || file?.filename)) {
      setFilesListState((preState) => [...preState, file]);
    }
  };

  useEffect(() => {
    setFilesListState([]);
    if (files?.length > 0) {
      [].forEach.call(files, readAndSetFile);
    }
  }, [files]);

  // const handleRemoveItem = (index) => {
  //   document.querySelector(`#${item?.id}`).value = '';
  //   if (index) {
  //     setFilesListState((preState) => preState.filter((_, idx) => idx !== index));
  //   } else {
  //     setFilesListState([]);
  //   }
  // };

  return item ? (
    <div className={`${item?.className} `}>
      {item.label && (
        <label htmlFor={item?.id}>
          <p className="mb-2">{item.label}</p>
        </label>
      )}
      <div>
        <Controller
          control={control}
          rules={item?.rules}
          render={({ field: { onChange, onBlur } }) => {
            return (
              <>
                <div
                  className={classNames(
                    'cursor-pointer border border-dashed p-4 rounded-lg relative z-1 group hover:border-primary hover:text-primary',
                    item?.classNameInput,
                  )}
                  onClick={() => {
                    document.querySelector(`#${item?.id}`).click();
                  }}
                >
                  {item?.placeholder}
                </div>
                <div className="my-4">
                  {filesListState.length > 0 &&
                    filesListState?.map((file) => (
                      <Badge
                        key={file?.name || file?.originalname}
                        color="primary"
                        className="inline-block m-1 whitespace-nowrap"
                        // onClick={() => {
                        //   handleRemoveItem(index);
                        // }}
                      >
                        {file.name || file?.originalname}
                        {/* <span>
                          <FiX className="inline" />
                        </span> */}
                      </Badge>
                    ))}
                  {/* {filesListState.length > 1 && (
                    <Badge
                      color="danger"
                      className="inline-block m-1 cursor-pointer whitespace-nowrap "
                      onClick={() => {
                        handleRemoveItem();
                      }}
                    >
                      Clear all
                    </Badge>
                  )} */}
                </div>
                <input
                  id={item?.id}
                  onBlur={onBlur}
                  onChange={(e) => {
                    onChange(e.target.files);
                  }}
                  className={'hidden'}
                  placeholder={item?.placeholder}
                  type={'file'}
                  multiple={item?.multiple}
                  disabled={item?.disabled}
                  accept={item?.accept}
                />
                <Preview data={filesListState} type={item?.previewType} />
              </>
            );
          }}
          name={item?.name}
          defaultValue={item?.defaultValue}
        />

        <Input.errorText message={errors?.[item.name]?.message} />
      </div>
    </div>
  ) : null;
};

InputFile.propTypes = {
  item: PropTypes.object.isRequired,
};

export default InputFile;
