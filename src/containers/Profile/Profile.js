import {Card, Layout, message, Typography, Upload} from 'antd';
import 'containers/Profile/style.scss';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {addProfile} from 'reducers/Boarding/boardingSlice';

const {Content} = Layout;
const {Text,Title} = Typography;
const Profile = () =>{

  const dispatch = useDispatch();
  const loading = useSelector(state => state.Auth.profileLoader);
  const imageUrl = useSelector(state => state.Auth.profilePicture);
  const fName = useSelector(state => state.Auth.firstName);
  const lName = useSelector(state => state.Auth.lastName);
  const email = useSelector(state => state.Auth.email);

  const handleChange =(file)=>{

    const isJpgOrPng = file.file.type === 'image/jpeg' || file.file.type === 'image/png';
    const isLt2M = file.file.size / 1024 / 1024 < 2;

    if(!isJpgOrPng){
      message.error('You can only upload JPG/PNG file!');
    }

    if (!isLt2M){
      message.error('Image must smaller than 2MB!');
    }

    if(isLt2M && isJpgOrPng){
      dispatch(addProfile({image:file.fileList}))
    }

  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return(
    <Content className={'profile-page'}>
      <Card>
        <Title level={5}>Profile:</Title>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={()=>false}
          onChange={handleChange}
          multiple={false}
          maxCount={1}
        >
          {imageUrl && !loading ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{
                width: '100%',
                borderRadius:5,
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <br/>
        <br/>

        <span className={'field'}><Text strong>FirstName:</Text> <Text code>{fName}</Text></span><br/><br/>
        <span className={'field'}><Text strong>LastName:</Text> <Text code>{lName}</Text></span><br/><br/>
        <span className={'field'}><Text strong>Email:</Text> <Text code>{email}</Text></span>
      </Card>
    </Content>
  )
}

export default Profile;