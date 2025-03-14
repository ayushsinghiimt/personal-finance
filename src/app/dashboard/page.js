"use client";

import { useAuth } from "../context/AuthProvider";
import { supabase } from "../../../superbaseClient";
import { StatsGridIcons } from "@/components/StatsCard";
import ReactECharts from "echarts-for-react";
import { Box, Paper, Group, Title } from "@mantine/core";
import classes from "./DashboardPage.module.css";

export default function DashboardPage() {
  const { session } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const data = [
    { title: "Total Income", value: "$13,456", diff: 34 },
    { title: "Total Expenses", value: "$4,145", diff: -13 },
    { title: "Net Worth", value: "745", diff: 18 },
  ];

  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Income", "Expenses"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    },
    yAxis: {
      type: "value",
    },

    series: [
      {
        name: "Income",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Expenses",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
    ],
  };
  const pieChart = {
    title: {
      text: "Referer of a Website",
      subtext: "Fake Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return (
    <>
      <StatsGridIcons data={data} />
      <Box px="xs" my={"xs"} style={{ marginBottom: "80px" }}>
        <Paper withBorder mb={"md"} radius={0}>
          <Group
            justify={"space-between"}
            align={"center"}
            className={classes.header}
          >
            <Title order={5} style={{ marginLeft: "12px", padding: "10px" }}>
              Income vs Expenses (last 6 months)
            </Title>
          </Group>
          <Box p={"20px"}>
            <ReactECharts option={option} opts={{ renderer: "svg" }} />
          </Box>
        </Paper>
      </Box>

      <Box
        px="xs"
        my={"xs"}
        style={{ marginBottom: "80px", marginTop: "60px" }}
      >
        <Paper withBorder mb={"md"} radius={0}>
          <Group
            justify={"space-between"}
            align={"center"}
            className={classes.header}
          >
            <Title order={5} style={{ marginLeft: "12px", padding: "10px" }}>
              Expenses by Category
            </Title>
          </Group>
          <Box p={"30px"}>
            <ReactECharts option={pieChart} opts={{ renderer: "svg" }} />
          </Box>
        </Paper>
      </Box>
    </>
  );
}
