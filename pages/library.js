import styles from "../styles/Library.module.scss";
import LibraryInstrumentList from "../components/LibraryComponents/LibraryInstrumentList";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { Form, Container, Col, Row, Collapse, Button } from "react-bootstrap";
import DropdownChecklist from "../components/DropdownChecklist";
import instrumentData from "../components/data/instruments.json";
import defaultVocalData from "../components/data/defaultVocals.json";
import orchInstrumentData from "../components/data/orchInstruments.json";
import orchSectionData from "../components/data/orchSections.json";
import defaultGuitarData from "../components/data/defaultGuitars.json";

const DEFAULT_FAMILY_CHECKS = [
  { label: "String", checked: true },
  { label: "Percussion", checked: true },
  { label: "Brass", checked: true },
  { label: "Wind", checked: true },
  { label: "Electronic", checked: true },
  { label: "Keyboard", checked: true },
];
const DEFAULT_CATEGORY_CHECKS = [
  { label: "Contemporary", checked: true },
  { label: "Orchestral", checked: true },
  { label: "Traditional", checked: true },
  { label: "Vocal", checked: true },
];

const library = () => {
  const [sortingOption, setSortingOption] = useState("0");
  const [familyFilterOptions, setFamilyFilterOptions] = useState([
    { label: "String", checked: true },
    { label: "Percussion", checked: true },
    { label: "Brass", checked: true },
    { label: "Wind", checked: true },
    { label: "Electronic", checked: true },
    { label: "Keyboard", checked: true },
  ]);
  const [categoryFilterOptions, setCategoryFilterOptions] = useState([
    { label: "Contemporary", checked: true },
    { label: "Orchestral", checked: true },
    { label: "Traditional", checked: true },
    { label: "Vocal", checked: true },
  ]);

  const [open, setOpen] = useState(false);

  const resetAllChecks = () => {
    setCategoryFilterOptions(
      categoryFilterOptions.map((option) => ({
        label: option.label,
        checked: true,
      }))
    );
    setFamilyFilterOptions(
      familyFilterOptions.map((option) => ({
        label: option.label,
        checked: true,
      }))
    );
  };

  const returnCheckedCategories = () => {
    var list = [];

    categoryFilterOptions.map((checkbox) => {
      if (checkbox.checked) {
        list.push(checkbox.label);
      }
    });

    return list;
  };
  return (
    <div>
      <NextSeo
        title="Instrument Library"
        description="A tool for composers to generate random groups of instruments to help jumpstart creativity."
      />

      <Container fluid>
        <Row>
          <Col>
            <h1 className={styles.headingOne}>The Instrument Library</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5 className={styles.headingFive}>
              Browse all instruments included in Instrumentation Generation
            </h5>
            <h5 className={styles.headingFive}>
              There are currently{" "}
              <strong>
                {instrumentData.length +
                  defaultVocalData.length +
                  orchInstrumentData.length +
                  orchSectionData.length +
                  defaultGuitarData.length}
              </strong>{" "}
              instruments in the library
            </h5>
          </Col>
        </Row>

        <Row style={{ marginTop: "1rem" }}>
          <Col>
            <Row>
              <Col xl={{ span: 4, offset: 4 }}>
                <Button
                  variant="outline-light"
                  style={{ width: "100%" }}
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  <span style={{ float: "left" }}>{open ? "▲" : "▼"}</span>
                  Filtering
                </Button>
                <Collapse in={open}>
                  <div>
                    <Row style={{ marginTop: "1rem" }}>
                      <Col>
                        <h5 style={{ textAlign: "center", color: "white" }}>
                          Category Filtering:{" "}
                        </h5>
                        <DropdownChecklist
                          disabled={false}
                          checkOptions={categoryFilterOptions}
                          returnChecksState={setCategoryFilterOptions}
                        ></DropdownChecklist>
                      </Col>
                      <Col>
                        <h5 style={{ textAlign: "center", color: "white" }}>
                          Family Filtering:{" "}
                        </h5>
                        <DropdownChecklist
                          disabled={
                            returnCheckedCategories() == "Vocal" ||
                            returnCheckedCategories() == ""
                              ? "disabled"
                              : ""
                          }
                          checkOptions={familyFilterOptions}
                          returnChecksState={setFamilyFilterOptions}
                        ></DropdownChecklist>
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={{ span: 4, offset: 4 }}>
                        <Button
                          variant="outline-light"
                          style={{ width: "100%" }}
                          onClick={() => {
                            resetAllChecks();
                          }}
                        >
                          Reset Filter
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Collapse>
              </Col>
              <Col xl={{ span: 2, offset: 2 }}>
                <div className={styles.sortButton}>
                  <select
                    className="custom-select"
                    id="sortingSelect"
                    onChange={(e) => setSortingOption(e.target.value)}
                  >
                    <option defaultValue value="0">
                      Random
                    </option>
                    <option value="1">A - Z</option>
                    <option value="2">Z - A</option>
                  </select>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <LibraryInstrumentList
        sortOption={sortingOption}
        categoryFilterOptions={categoryFilterOptions}
        familyFilterOptions={familyFilterOptions}
      />
    </div>
  );
};

export default library;
