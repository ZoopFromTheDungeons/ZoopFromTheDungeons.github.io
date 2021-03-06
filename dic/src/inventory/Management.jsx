import { Input, Row, Col, Divider, Button } from "antd";
import React from "react";
import Checkbox from "./CheckboxCoc.jsx";
import SearchField from "./SearchFieldCoc.jsx";
import InventoryUser from "../models/InventoryUser";
import { CopyToClipboard } from "react-copy-to-clipboard";

const { TextArea } = Input;
let inventoryUser = new InventoryUser();

export default class Management extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prettierText: "",
      copySuccess: "Copy",
    };
    if (
      localStorage.getItem("filterList") !== "" &&
      localStorage.getItem("filterList") !== null
    ) {
      this.filterList = localStorage.getItem("filterList").split(",");
    }
  }

  basePrice = 100;
  addIcons = true;
  checkBoxPrice = false;
  checkBoxCombineItems = false;
  checkBoxSortType = false;
  checkBoxCombineUp = false;
  checkBoxFilterOption = false;
  checkBoxAddSpace = true;
  filterList = [];
  normalList = [];

  onCheckboxPriceAddChange = (e) => {
    this.checkBoxPrice = !this.checkBoxPrice;
    this.fixText();
  };

  onCheckboxSortTypeChange = (e) => {
    this.checkBoxSortType = !this.checkBoxSortType;
    this.fixText();
  };

  onChangeInputText = (e) => {
    this.normalList = e.currentTarget.value.split("\n");
    this.fixText();
  };

  onChangeInputPrice = (e) => {
    this.basePrice = e.target.value;
    this.fixText();
  };

  onChangeSearchField = (e) => {
    this.filterList = e;
    localStorage.setItem("filterList", e);
    this.fixText();
  };

  fixText = () => {
    inventoryUser = new InventoryUser();

    if (
      localStorage.getItem("filterList") !== "" &&
      localStorage.getItem("filterList") !== null
    ) {
      this.filterList = localStorage.getItem("filterList").split(",");
    }

    for (let l of this.normalList) {
      inventoryUser.ParseItem(l);
    }

    this.setState({
      prettierText: inventoryUser.toString(
        this.filterList,
        this.checkBoxPrice,
        this.basePrice,
        this.checkBoxSortType,
        this.checkBoxCombineItems,
        this.checkBoxCombineUp,
        this.checkBoxFilterOption,
        this.checkBoxAddSpace
      ),
    });
  };

  render() {
    return (
      <>
        <Row gutter={16} justify="center">
          <Col className="gutter-row" xs={24} s={24} m={12} l={12} xl={12}>
            <Divider className="noselect">Paste API Here</Divider>
            <Row justify="center">
              <TextArea
                rows={6}
                spellCheck={false}
                onChange={this.onChangeInputText}
                placeholder="Try copying your !api, !api s [item], !api e etc!
                Ignores lines that are not items, so feel free to copy non item parts as well!
                You can even copy entire pages of different api's from different members to see what you all got using the combine up all items button!
                Reducing inventory to read (x2) for duplicates etc. with the Reduce Inventory button!"
              />
            </Row>
            <Divider className="noselect">Options</Divider>

            <Row justify="center">
              <Col xs={22} s={22} m={14} l={14} xl={14}>
                <p className="noselect">Remove Items from Output</p>
                <SearchField
                  defaultValue={this.filterList}
                  onChange={this.onChangeSearchField}
                />
                <Checkbox
                  className="noselect"
                  onChange={() => {
                    this.checkBoxFilterOption = !this.checkBoxFilterOption;
                    this.fixText();
                  }}
                  text="Toggle filter"
                />
                <Row justify="center" style={{ marginTop: "15px" }}>
                  <Checkbox
                    className="noselect"
                    onChange={() => {
                      this.checkBoxCombineUp = !this.checkBoxCombineUp;
                      this.fixText();
                    }}
                    text="Combine up all Items"
                  />
                </Row>
              </Col>
              <Col
                xs={24}
                s={24}
                m={9}
                l={9}
                xl={9}
                style={{ marginLeft: "15px" }}
              >
                <Row justify="center" style={{ marginTop: "15px" }}>
                  <Checkbox
                    className="noselect"
                    onChange={() => {
                      this.checkBoxCombineItems = !this.checkBoxCombineItems;
                      this.fixText();
                    }}
                    text="Reduce Inventory"
                  />
                </Row>
                <Row justify="center" style={{ marginTop: "15px" }}>
                  <Checkbox
                    className="noselect"
                    onChange={() => {
                      this.checkBoxSortType = !this.checkBoxSortType;
                      this.fixText();
                    }}
                    text="Sort for Type"
                  />
                  {this.checkBoxSortType && (
                    <Checkbox
                      className="noselect"
                      onChange={() => {
                        this.checkBoxAddSpace = !this.checkBoxAddSpace;
                        this.fixText();
                      }}
                      text="Add Space"
                    />
                  )}
                </Row>
                <Row justify="center" style={{ marginTop: "15px" }}>
                  <Checkbox
                    className="noselect"
                    onChange={() => {
                      this.checkBoxPrice = !this.checkBoxPrice;
                      this.fixText();
                    }}
                    text="Add Price to all Items"
                  />
                  {this.checkBoxPrice && (
                    <Input
                      defaultValue="100"
                      maxLength={4}
                      style={{ width: "60%", marginTop: "15px" }}
                      onChange={this.onChangeInputPrice}
                    />
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" xs={24} s={24} m={12} l={12} xl={12}>
            <Divider className="noselect">
              Receive Prettier Inventory Here
            </Divider>
            <TextArea
              spellCheck={false}
              value={this.state.prettierText}
              rows={6}
            />
            <CopyToClipboard text={this.state.prettierText}>
              <Button
                style={{ marginTop: "15px" }}
                onClick={() => {
                  this.setState({ copySuccess: "Copied!" });
                }}
              >
                {this.state.copySuccess}
              </Button>
            </CopyToClipboard>
          </Col>
        </Row>
      </>
    );
  }
}
