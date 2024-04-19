import React, { useEffect, useState } from "react";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios.js";
import { REGULATION_DETAILS } from "../urls.js";
import ReactCountryFlag from "react-country-flag";
import toast from "react-hot-toast";
import {formatDateToString, isDateGreaterThanToday} from "../utils.js"
import { SegmentedControl, Accordion, List } from "@mantine/core";

const RegulationDetail = () => {
  const { regulation_id = 0 } = useParams();
  const [regulation, setRegulation] = useState({});
  const [deadlinesDefinitionLinkData, setDeadlinesDefinitionLinkData] =
    useState({});
  const REGULATION_DETAIL_CHOICES = [
    { value: "WHAT_IS_REGULATION_ABOUT", label: "What is regulation about" },
    { value: "SCOPE", label: "Scope" },
    { value: "EXEMPTIONS", label: "Exemptions" },
    {
      value: "WHAT_ACTIONS_NEED_TO_BE_TAKEN",
      label: "What actions need to be taken",
    },
    { value: "DATA_REQUIRED_FOR_ACTION", label: "Data required for action" },
    { value: "HOW_TO_COMPLETE_ACTIONS", label: "How to complete actions" },
  ];
  const [regulationDetails, setRegulationDetails] = useState({});
  const [activeOption, setActiveOption] = useState("WHAT_IS_REGULATION_ABOUT");

  const fetchIndividualRegulationData = async () => {
    try {
      const response = await axiosInstance.get(
        REGULATION_DETAILS.replace(":regulation_id", `${regulation_id}/`)
      );
      if (response?.status === 200) {
        const {
          country,
          name,
          regulation_detail = [],
          deadlines = {},
          definitions = [],
          links = [],
        } = response?.data || {};
        setRegulation({ country, name });
        setDeadlinesDefinitionLinkData({ deadlines, definitions, links });
        const updatedRegulationDetails = {};
        REGULATION_DETAIL_CHOICES.forEach((reg) => {
          updatedRegulationDetails[reg?.value] = [];
        });
        for (const ele of regulation_detail) {
          const regCategoryName = ele?.category;
          updatedRegulationDetails[regCategoryName].push(ele);
        }
        setRegulationDetails(updatedRegulationDetails);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.detail, {
        style: { background: "#242424", color: "#fff" },
      });
    }
  };
  useEffect(() => {
    if (regulation_id) {
      fetchIndividualRegulationData();
    }
  }, [regulation_id]);
//   REGULATION_DETAIL_CHOICES?.push({ value: "deadlines", label: "Deadlines" });
  const Options = () => {
    return (
      <div className="options">
        <SegmentedControl
          orientation="vertical"
          color="#0CA678"
          value={activeOption}
          onChange={(opt) => setActiveOption(opt)}
          className="tab-border"
          fullWidth
          data={[...REGULATION_DETAIL_CHOICES, { value: "deadlines", label: "Deadlines" }]}
        />
      </div>
    );
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const prepareSubmitDate = (dateString) => {
        const isDateGreater = isDateGreaterThanToday(dateString)
        const formattedDate = formatDateToString(dateString);
        return <Badge color={isDateGreater? "teal": "red"}>{formattedDate}</Badge>
  }
  console.log('regulationDetails', regulationDetails)
  console.log('deadlinesDefinitionLinkData', deadlinesDefinitionLinkData)
  return (
    <div className="px-6 mt-6">
      {regulation_id && regulation ? (
        <section className="flex gap-x-4">
          <div className="w-3/4">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <div className="flex items-center justify-between">
                <Text c="dimmed" fz="sm">
                  Regulation Name :{" "}
                  <Text span fw={500} c="bright">
                    {regulation?.name}
                  </Text>
                </Text>

                <Text c="dimmed" fz="sm">
                  Country :{" "}
                  <Text span fw={500} c="bright">
                    {regulation?.country}
                    <ReactCountryFlag
                      countryCode="GB"
                      style={{ fontSize: "2rem", marginLeft: "2px" }}
                    />
                  </Text>
                </Text>
              </div>
            </Card>
            <Card
              shadow="sm"
              radius="md"
              padding="lg"
              withBorder
              className="mt-2 details-card"
            >
              <Options />
              <div className="content-card">
                <Accordion>
                  {(regulationDetails[activeOption] || [])?.map((ele) => {
                    const value =
                      activeOption === "WHAT_ACTIONS_NEED_TO_BE_TAKEN"
                        ? ele?.organization_type
                        : ele?.header;
                    return (
                      <Accordion.Item key={ele?.id} value={`${value} ${activeOption === "HOW_TO_COMPLETE_ACTIONS" ? ele?.mode_of_payment : '' }`|| ""}>
                        <Accordion.Control>
                        <div className="flex items-center gap-x-3">
                        <Text fw={600}>{capitalizeFirstLetter(value)}</Text>
                        {activeOption === "HOW_TO_COMPLETE_ACTIONS" && ele?.mode_of_payment && <Badge color="blue" size="sm" radius="lg">{ele?.mode_of_payment}</Badge>}
                        </div>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <List listStyleType="disc">
                            {ele?.points?.map((point, idx) => {
                              return (
                                <List.Item key={idx}>
                                  {capitalizeFirstLetter(point)}
                                </List.Item>
                              );
                            })}
                          </List>
                        </Accordion.Panel>
                      </Accordion.Item>
                    );
                  })}
                  {activeOption === "deadlines" &&
                    Object.entries(
                      deadlinesDefinitionLinkData[activeOption] || {}
                    )?.map(([country, organizations], idx) => (
                      <Accordion.Item key={idx} value={country || ""}>
                        <Accordion.Control>
                        <Text fw={600}>{capitalizeFirstLetter(country)}</Text>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <List withPadding listStyleType="disc">
                            {Object.entries(organizations || {})?.map(
                              ([organization, deadlines], idx) => (
                                <List.Item key={idx}>
                                  {capitalizeFirstLetter(organization)}
                                  <List withPadding listStyleType="disc">
                                    {deadlines?.map((deadline, idx) => (
                                      <List.Item key={idx}>
                                        {deadline?.date_range
                                        ? <>For {formatDateToString(deadline.date_range[0])} to {formatDateToString(deadline?.date_range[1])} should submit by {prepareSubmitDate(deadline?.submission_date)}</>
                                        : <> Submit by {prepareSubmitDate(deadline?.submission_date)}</>}
                                        {deadline?.penalty_charge_applicable && ` (Penalty Charge Applicable: ${deadline.fees_information})`}
                                      </List.Item>
                                    ))}
                                  </List>
                                </List.Item>
                              )
                            )}
                          </List>
                        </Accordion.Panel>
                      </Accordion.Item>
                    ))}
                </Accordion>
              </div>
            </Card>
          </div>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="w-1/4"
          >
            <Text fw={600} className="definition-heading">Definations</Text>
            {(deadlinesDefinitionLinkData['definitions'] || [])?.map((definition) => {
                return <div className="flex">
                    <Text fw={500} className="definition-acronym">{definition?.acronym}</Text> -
                    <Text className="definition-phrase">{definition?.phrase}</Text>
                </div>
            }) }
          </Card>
        </section>
      ) : (
        <p>No Regulation Exists</p>
      )}
    </div>
  );
};

export default RegulationDetail;
