import {Button, Form, Input, message, Typography, Upload} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {createBlog, setDrawer, updateBlog} from 'reducers/BlogList/blogSlice';

const {TextArea} = Input;
const {Link}=Typography;

const BlogCreateForm = () =>{

  const loader = useSelector(state => state.Blog.submitLoader);
  const isEdit = useSelector(state => state.Blog.isEditForm);
  const blogName = useSelector(state => state.Blog.blogName);
  const blogImage = useSelector(state => state.Blog.blogImage);
  const blogContent = useSelector(state => state.Blog.blogContent);
  const dispatch = useDispatch();
  const onFinish=(values)=>{
    if(isEdit){
      let data = {
        ...values,
        image:values.image? values.image : blogImage,
      }
      dispatch(updateBlog(data));
    }else{
      dispatch(createBlog(values));
    }

  }

  const onClose = ()=>{
    dispatch(setDrawer({showDrawer:false,isEditForm: false}));
  }

  const normFile = (file) => {
    const isJpgOrPng = file.file.type === 'image/jpeg' || file.file.type === 'image/png';
    const isLt2M = file.file.size / 1024 / 1024 < 2;
    if (isJpgOrPng) {
      if (isLt2M) {
        if (Array.isArray(file)) {
          return file;
        }
        return file && file.fileList;
      }else{
        message.error('Image must smaller than 2MB!');
        return {file:{},fileList:[]} && [];
      }
    }else{
      message.error('You can only upload JPG/PNG file!');
      return {file:{},fileList:[]} && [];
    }
  };

  return(
    <Form
      name={'Create'}
      onFinish={onFinish}
      autoComplete="off"
      preserve={false}
      initialValues={{
        name:isEdit?blogName:'',
        content:isEdit?blogContent:'',
      }}
    >

      <label>Title<span className={'danger'}>*</span></label>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your Blog Title!',
          },
        ]}
      >
        <Input placeholder={'Blog Title'}/>
      </Form.Item>

      <label>Cover Image<span className={'danger'}>*</span></label>
      <Form.Item>
        <Form.Item
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: !isEdit, message: 'Please input your Cover image!' }]}
          noStyle>
          <Upload.Dragger name="files" maxCount={1} beforeUpload={()=>false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {
                isEdit?
                  'Add Your New Image, Automatically Old Image will remove' :
                  'Click or drag image to this area to upload'
              }
            </p>
            <p className="ant-upload-hint">Image Format : .jpg, .png</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
      {
        isEdit &&(
          <>
            <Link href={blogImage} target={'_blank'}>
              Click me to view Cover Image!!!
            </Link> <br/>
          </>
        )
      }

      <label>Content<span className={'danger'}>*</span></label>
      <Form.Item
        name="content"
        rules={[
          {
            required: true,
            message: 'Please input your Blog Content!',
          },
        ]}
      >
        <TextArea placeholder={'Blog Title'} rows={6} />
      </Form.Item>
      <Form.Item className={'footer'}>
        <Button onClick={onClose} htmlType={'button'}>
          Cancel
        </Button>
        <Button type={'primary'} htmlType={'submit'} loading={loader}>
          {isEdit?'Update':'Create'}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BlogCreateForm;