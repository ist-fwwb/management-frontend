/**
 * Created by 励颖 on 2019/1/16.
 */

import React from "react";
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { roomController, utils_list } from "variables/general.jsx";
import {ossClient, meetingRoomDir} from "variables/oss.jsx";
import {Upload, Icon, Modal} from 'antd';
import 'antd/lib/upload/style/css';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  upload:{
    width: "20px",
    height: "10%",
    color: "#999",
  }
});

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}



class AddRoom extends React.Component {
  constructor(props){
    super(props);
    this.state={
      size: "MIDDLE",
      location: "软件学院3510",
      AirConditioner: false,
      BlockBoard: false,
      Table: false,
      Projector: false,
      PowerSupply: false,
      devices:[],
      utils: [],
      previewVisible: false,
      previewImage: '',
      loading: false,
      imageUrl:"",
      fileList: [],
      fileName:[],
    }
  }



  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handlePictureChange = (info) => {
    console.log(this.state.fileList);
    this.setState({ fileList: info.fileList });

    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value});
  };

  handleDeviceChange = name => event => {
    this.setState({
        [name]:event.target.checked,
        devices:[]
    },()=>{
    if(this.state.AirConditioner)
        this.state.devices.push("AIRCONDITIONER");
      if(this.state.BlockBoard)
          this.state.devices.push("BLOCKBOARD");
      if(this.state.Table)
          this.state.devices.push("TABLE");
      if(this.state.Projector)
          this.state.devices.push("PROJECTOR");
      if(this.state.PowerSupply)
          this.state.devices.push("POWERSUPPLY");
      for (let i =0; i< this.state.devices.length;i++)
        console.log(this.state.devices[i]);
  })
  };

  handleChangeCheckBox = event => {
    event.preventDefault();
    let { utils } = this.state;
    if (event.target.checked){
      utils.push(event.target.name);
    }
    else{
      utils.splice(utils.indexOf(event.target.name), 1);
    }
    this.setState({ utils });
  };

  handleAdd = () =>{
      //console.log("hello");
      let room={
          "id": "",
          "location": this.state.location,
          "size": "BIG",
          "utils": this.state.devices,
          "images":[]
      };
      console.log(room.id);
      console.log(room.location);
      console.log(this.state.devices);
      let picCount = this.state.fileList.length;
      for(let i=0; i<picCount; i++) {
        //let result = ossClient.put(room.location + String(i), this.state.fileList[i].url);
        //console.log(result);
      }

      /*fetch(roomController.createRoom()+"/", {
          credentials: 'include',
          method:'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "id": "",
              "location": this.state.location,
              "size": "BIG",
              "utils": this.state.devices,
              "deviceId": null
          })
      })
          .then(response => {
              console.log('Request successful', response);
              return response.json()
                  .then(result => {
                      console.log("result:", result.id);
                      if(response.status === 200)
                          alert("添加成功");
                      else
                          alert("添加失败");
                  });
          })*/
};

  beforeUpload=(file)=>{

    //rc-upload-1551444190052-2
    let len = file.uid.length;
    let filename = file.uid.substring(10, len);
    console.log(filename);
    let extensions;
    if (file.type === "image/jpeg"){
      extensions = ".jpg";
    }
    else if (file.type === "image/png"){
      extensions = ".png";
    }
    else{
      alert("仅支持 JPG 和 PNG 格式图片");
      return false;
    }
    let path = meetingRoomDir + "/" + filename;

    let faceFile = path + extensions;
    console.log("faceFile:", faceFile);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      ossClient.multipartUpload(faceFile, file)
          .then((result) => {
              console.log("oss result:", result);
             console.log("oss result code:", result.res.status);

             if (result.res.status === 200){
               console.log("hello");
               this.setState({
                 imageUrl: "http://face-file.oss-cn-shanghai.aliyuncs.com/" + faceFile
               })
             }
             else{
               console.log("failed!");
             }
      })
    }
    return false;


  };

  render() {
    const {classes} = this.props;
    const {location, size, utils} = this.state;
    const { previewVisible, previewImage, fileList, imageUrl } = this.state;
    const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">上传图片</div>
        </div>
    );

    return (
      <div>
        <GridContainer >
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader style={{fontSize:"20px", color:"#757575", fontWeight:"700"}}>
                基本信息
              </CardHeader>
              <CardBody>
                <TextField
                    label="场所"
                    name="location"
                    fullWidth
                    onChange={this.handleChange}
                    className={classes.textField}
                    value={location}
                    margin="normal"
                    variant="outlined"
                    style={{width:"50%"}}
                />
                &nbsp;&nbsp;
                <TextField
                    select
                    fullWidth
                    name="size"
                    label="会议室大小"
                    className={classes.textField}
                    value={size}
                    onChange={this.handleChange}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                    variant="outlined"
                    style={{width:"40%"}}
                >
                  <MenuItem key={"BIG"} value={"BIG"}>
                    大会议室
                  </MenuItem>
                  <MenuItem key={"MIDDLE"} value={"MIDDLE"}>
                    中会议室
                  </MenuItem>
                  <MenuItem key={"SMALL"} value={"SMALL"}>
                    小会议室
                  </MenuItem>
                </TextField>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader style={{fontSize:"20px", color:"#757575", fontWeight:"700"}}>
                设备要求
              </CardHeader>
              <CardBody>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormGroup row>
                    <FormControlLabel
                        control={
                          <Checkbox
                              name={utils_list.airconditioner}
                              checked={utils.includes(utils_list.airconditioner)}
                              onChange={this.handleChangeCheckBox}
                              color="primary"
                          />
                        }
                        label="空调"
                    />
                    <FormControlLabel
                        control={
                          <Checkbox
                              name={utils_list.blackboard}
                              checked={utils.includes(utils_list.blackboard)}
                              onChange={this.handleChangeCheckBox}
                              color="primary"
                          />
                        }
                        label="黑板"
                    />
                    <FormControlLabel
                        control={
                          <Checkbox
                              name={utils_list.table}
                              checked={utils.includes(utils_list.table)}
                              onChange={this.handleChangeCheckBox}
                              color="primary"
                          />
                        }
                        label="桌子"
                    />
                    <FormControlLabel
                        control={
                          <Checkbox
                              name={utils_list.network}
                              checked={utils.includes(utils_list.network)}
                              onChange={this.handleChangeCheckBox}
                              color="primary"
                          />
                        }
                        label="有线网络"
                    />

                  </FormGroup>
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormGroup row>
                    <FormControlLabel
                        control={
                          <Checkbox
                              name={utils_list.power}
                              checked={utils.includes(utils_list.power)}
                              onChange={this.handleChangeCheckBox}
                              color="primary"
                          />
                        }
                        label="电源"
                    />
                    <FormControlLabel
                        control={
                          <Checkbox
                              name={utils_list.tv}
                              checked={utils.includes(utils_list.tv)}
                              onChange={this.handleChangeCheckBox}
                              color="primary"
                          />
                        }
                        label="电视"
                    />
                    <FormControlLabel
                        control={
                          <Checkbox
                              name={utils_list.wifi}
                              checked={utils.includes(utils_list.wifi)}
                              onChange={this.handleChangeCheckBox}
                              color="primary"
                          />
                        }
                        label="Wi-Fi"
                    />
                    <FormControlLabel
                        control={
                          <Checkbox
                              name={utils_list.projector}
                              checked={utils.includes(utils_list.projector)}
                              onChange={this.handleChangeCheckBox}
                              color="primary"
                          />
                        }
                        label="投影仪"
                    />
                  </FormGroup>
                </FormControl>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader style={{fontSize:"20px", color:"#757575", fontWeight:"700"}}>
                相关图片
              </CardHeader>
              <CardBody >
                <Upload
                    beforeUpload={this.beforeUpload}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handlePictureChange}
                >
                  {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <Dialog open={previewVisible} onClose={this.handleCancel}>
                  <DialogActions>
                    <IconButton  onClick={this.handleCancel}>
                      <CloseIcon />
                    </IconButton>
                  </DialogActions>
                  <DialogContent>
                    <img src={previewImage} style={{ width: '100%' }}/>
                  </DialogContent>

                </Dialog>
              </CardBody>
            </Card>
          </GridItem>


          <GridItem xs={20} sm={20} md={6}>
            <h1>&nbsp;</h1>
            <h1>&nbsp;</h1>
            <Button
                onClick={this.handleAdd}
                style={{marginLeft:"70%", fontSize:"18px", lineHeight:"20px", background:"#303f9f", color:"white"}}>
              确认添加
            </Button>
          </GridItem>
        </GridContainer>
        </div>
    );
  }


}




export default withStyles(styles)(AddRoom);
