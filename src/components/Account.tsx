import React from "react";
import { gql } from "graphql-request";
import { useCustom } from "@refinedev/core";
import { Avatar, Box, Typography } from "@mui/material";
import {Show} from "@refinedev/mui";

export const VIEWER_QUERY = gql`
    query {
        viewer {
            login
            avatarUrl
        }
    }
`;
const Account = () => {
    const { data, isLoading, isError } = useCustom({
        method: "get",
        meta: {
            gqlQuery: VIEWER_QUERY
        }
    });

    const user = data?.data.viewer

    return (
        <Show
            isLoading={isLoading}
            title="Account Information"
            resource="viewer"
        >
            {user && (
                <>
                    <Box display="flex" justifyContent="center" mb={2}>
                        <Avatar
                            src={user.avatarUrl}
                            alt={user.login}
                            sx={{ width: 100, height: 100 }}
                        />
                    </Box>
                    <Typography variant="h4" align="center" gutterBottom>
                        {user?.login}
                    </Typography>
                </>
            )}
        </Show>
    );
};

export default Account;
