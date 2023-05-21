import {Skeleton} from 'antd';
import {memo} from 'react';

const SingleBlogPage = ({blogImage,loader,name,content}) => (
  <>
    <div className={'cover-image'} style={{backgroundImage:`url(${blogImage})`}}>
    </div>

    <div className={'content'}>
      <Skeleton loading={loader} active={true}>
        <h3>{name}</h3>
        <p>{content}</p>
      </Skeleton>
    </div>
  </>
)

export default memo(SingleBlogPage);