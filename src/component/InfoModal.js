import styles from "../assets/styles/InfoModal.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form } from "antd";
import { hideInfo } from "../redux/actions/popoverAction";
function InfoModal() {
  const dispatch = useDispatch();
  const isShowInfo = useSelector((state) => state?.popover?.isShowInfo);
  return (
    <Modal open={isShowInfo} onClose={() => dispatch(hideInfo())}>
      <Form
        name="info"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}>
        <Form.Item label="Title">Title</Form.Item>
      </Form>
    </Modal>
  );
}
