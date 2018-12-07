import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './index.less';


class StandardTable extends PureComponent {
  render() {
    const { data: { data, total }, rowKey, ...rest } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showTotal: totalCount => `共${totalCount}条`,
      total,
    };

    return (
      <div className={styles.standardTable}>
        <Table
          rowKey={rowKey || 'id'}
          dataSource={data}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };
}

export default StandardTable;
