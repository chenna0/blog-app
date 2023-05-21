import {Button, Result} from 'antd';
import {useNavigate} from 'react-router-dom';

const PageNotFound=()=>{
  const navigate = useNavigate();
  return(
    <Result
      status="404"
      title="Sorry"
      subTitle="The Page you visited does not exist."
      extra={<Button type="primary" onClick={()=>navigate('/')}>Back Home</Button>}
    />

  )
}

export default PageNotFound;