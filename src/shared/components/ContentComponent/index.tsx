import { Col, Row } from 'antd';
import LabelComponent from './LabelComponent/index';
import React from 'react';
import TextComponent from './TextComponent';

interface Props {
  text?: any;
  className?: any;
  label?: any;
  layout?: {
    labelCol?: { span?: any; pull?: any; push?: any };
    wrapperCol?: { span?: any; pull?: any; push?: any };
  };
  bold?: boolean;
  noShowTooltip?: boolean;
}

const ContentComponent = (props: Props) => {
  return (
    <div className={`text-component ${props.className ? props.className : ''}`}>
      <Row gutter={24}>
        <Col
          span={props.layout?.labelCol?.span ? props.layout?.labelCol?.span : 24}
          pull={props.layout?.labelCol?.pull}
          push={props.layout?.labelCol?.push}
        >
          {props.label && <LabelComponent bold={props?.bold} text={props.label} />}
        </Col>
        <Col
          span={props.layout?.wrapperCol?.span ? props.layout?.wrapperCol?.span : 24}
          pull={props.layout?.wrapperCol?.pull}
          push={props.layout?.wrapperCol?.push}
        >
          {props.text && <TextComponent text={props.text} noShowTooltip={props.noShowTooltip} />}
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(ContentComponent);
