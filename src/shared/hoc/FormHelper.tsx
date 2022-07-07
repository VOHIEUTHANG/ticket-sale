import FormNote from '@shared/components/FormNote';
import { Input } from 'antd';
import Form, { Rule } from 'antd/lib/form';
import lodash from 'lodash';
import { NamePath } from 'rc-field-form/lib/interface';
import React, { ReactNode } from 'react';
import { IntlShape } from 'react-intl';

export interface IFormContent {
  label?: string | React.ReactNode;
  name: string;
  render?: (placeholder: string | any, item?: IFormContent) => ReactNode | undefined;
  readOnly?: boolean;
  hidden?: boolean;
  rules?: Rule[];
  dependencies?: Array<NamePath>;
  maxLength?: number;
  disabled?: boolean;
  checked?: boolean;
  valuePropName?: string;
}

export class FormContent implements IFormContent {
  label: string | React.ReactNode;

  name = '';

  readOnly?: boolean;

  rules?: Rule[];

  private pPender?: (placeholder: string, item?: IFormContent) => ReactNode | undefined;

  render: (intl: IntlShape) => ReactNode;

  hidden?: boolean;

  maxLength = 256;

  disabled?: boolean;

  constructor(data: IFormContent) {
    Object.assign(this, data);
    this.pPender = data.render;
    this.render = this._render.bind(this);
  }

  private _render(intl: IntlShape) {
    const placeholder = this.placeholder(intl);
    if (this.pPender == null) {
      return (
        <Input
          placeholder={placeholder}
          disabled={this.disabled}
          readOnly={this.readOnly}
          hidden={this.hidden}
          maxLength={this.maxLength || 256}
        />
      );
    }

    return this.pPender && placeholder && this.pPender(placeholder, this);
  }

  private placeholder(intl: IntlShape) {
    if (this.label == null) {
      return undefined;
    }
    if (typeof this.label === 'string') {
      return intl.formatMessage(
        { id: 'common.input.placeholder' },
        {
          label: intl
            .formatMessage({ id: this.label, defaultMessage: this.label })
            .toLocaleLowerCase(),
        },
      );
    }
    return '';
  }
}

export function renderForm(
  items: IFormContent[],
  intl: IntlShape,
  isHideFormNote?: boolean,
): React.ReactNode {
  if (lodash.isEmpty(items)) {
    return null;
  }
  return (
    <>
      {items.map((item: IFormContent) => {
        const renderItem = new FormContent(item);
        let label = item?.label;
        if (typeof item?.label === 'string') {
          label = intl.formatMessage({ id: item?.label });
        }
        return (
          <Form.Item
            key={item.name}
            label={label}
            name={item?.name}
            rules={item.rules}
            dependencies={item.dependencies}
            hidden={item.hidden}
            valuePropName={item.valuePropName}
          >
            {renderItem.render(intl)}
          </Form.Item>
        );
      })}
      {!isHideFormNote && (
        <FormNote text={intl.formatMessage({ id: 'common.formNote' })}></FormNote>
      )}
    </>
  );
}
