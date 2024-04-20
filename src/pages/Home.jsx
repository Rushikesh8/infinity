import { useState } from 'react';
import { Card, Avatar, Text, Progress, Badge, Group, ActionIcon, Tooltip } from '@mantine/core';
import { Select } from '@mantine/core';
import axiosInstance  from '../axios.js';
import toast from 'react-hot-toast';
import {FETCH_REGULATION,REGULATION_DETAILS} from "../urls.js";
import ReactCountryFlag from "react-country-flag";
import {COUNTRY_CODE_MAPPING, calculateDaysLeft, convertUTCToLocalDate} from "../utils.js"
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [regulations, setRegulations] = useState([])
    const navigate = useNavigate();
    const fetchRegulations = async (country = null) => {
        try {
            const response = await axiosInstance.get(FETCH_REGULATION + (country ? `?country=${country}` : ""))
            if(response?.status === 200){
                console.log("response?.data?.regulations", response?.data?.regulations)
                setRegulations([...response?.data?.regulations])
            }
          }
        catch(err) {
            toast.error(err?.response?.data?.detail, {style: {background: "#242424", color: "#fff"}})
            }

    }
    return (
      <div>
      <section className='select-section w-2/6 mx-auto mt-6'>
        <Select
        label="Select Country"
        placeholder="Pick Country"
        data={['UK', 'INDIA', 'USA']}
        onChange={fetchRegulations}
        />
      </section>
      <section className='regulations-display-section mt-4 px-6'>
        {regulations?.map((ele,idx) => { 
            return <Card withBorder padding="lg" radius="md" className='w-3/12 hover:cursor-pointer hover:bg-gray-100' onClick={() => navigate(REGULATION_DETAILS?.replace(':regulation_id', ele?.id))}>
        <Group justify="space-between">
        <ReactCountryFlag countryCode={COUNTRY_CODE_MAPPING[ele?.country?.toUpperCase()] || ""} style={{ fontSize: "2rem" }} />
        <Tooltip label="Until Enforcement">
            <Badge className='primary-background-color'>{calculateDaysLeft(ele?.date_of_enforcement)} days</Badge>
            </Tooltip>
        </Group>

        <Text fz="xl" fw={700} mt="md">
            {ele?.name}
        </Text>
        {/* <Text fz="sm" c="dimmed" mt={5}>
            Form context management, Switch, Grid and Indicator components improvements, new hook and
            10+ other changes
        </Text> */}

        <Text c="dimmed" fz="sm" mt="md">
            Created On:{' '}
            <Text span fw={500} c="bright">
            {convertUTCToLocalDate(ele?.created_on)}
            </Text>
        </Text>
        </Card>})}
      </section>
      </div>
    );
  };
  export default Home;