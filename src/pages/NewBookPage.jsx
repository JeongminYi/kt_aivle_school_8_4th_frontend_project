import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    Stack
} from "@mui/material";
import { BookOutlined, Refresh as RefreshIcon } from "@mui/icons-material";

const customColors = {
    primaryPurple: "#6D28D9",
    secondaryPurple: "#5B21B6",
    infoIndigo: "#4F46E5",
    bannerBlue: "#0b5f82",
    backgroundLight: "#F9FAFB"
};

export default function NewBookPageMUI() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageSeverity, setMessageSeverity] = useState("info");

    const submitbook = async () => {
        if (title.trim() === "") {
            setMessageSeverity("warning");
            setMessage("제목을 입력해주세요.");
            return;
        }

        setIsLoading(true);
        setMessage(null);

        const requestBody = { title: title.trim(), content };

        try {
            const response = await fetch("http://localhost:8080/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`HTTP ${response.status} - ${text}`);
            }

            const data = await response.json();
            setMessageSeverity("success");
            setMessage("등록 완료!");
            // navigate to update cover page as in your original code
            navigate(`/detail/${data.bookId}/updateCover`);
        } catch (error) {
            console.error("등록 중 오류:", error);
            setMessageSeverity("error");
            setMessage("등록 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                width: "1500px",
                mx: "auto",
                py: 3,
            }}
        >
            {/* Banner */}
            <Paper
                elevation={3}
                sx={{
                    bgcolor: "#0b5f82",
                    color: "common.white",
                    px:4,
                    py: 2,
                    borderRadius: 1,
                    mb: 3,
                }}
            >
                <Stack spacing={0.2}>
                    <Typography variant="h5" component="h2">
                        신규 도서 등록
                    </Typography>
                    <Typography variant="body2">새로운 도서 정보 입력</Typography>
                </Stack>
            </Paper>

            {/* Message alert */}
            {message && (
                <Alert
                    severity={messageSeverity}
                    sx={{
                        mb: 2,
                        borderLeft: `4px solid ${
                            messageSeverity === "info"
                                ? customColors.infoIndigo
                                : messageSeverity === "warning"
                                    ? "#ff9800"
                                    : messageSeverity === "success"
                                        ? "#4CAF50"
                                        : "#F44336"
                        }`,
                        backgroundColor: customColors.backgroundLight,
                    }}
                >
                    {message}
                </Alert>
            )}

            {/* Main box */}
            <Paper
                elevation={4}
                sx={{
                    border: "2px solid #0b5f82",
                    p: { xs: 2, md: 4 },
                    mb: 3,
                }}
            >
                <Grid container spacing={10}>
                    {/* Left image area */}
                    <Grid item xs={12} md={3}>
                        <Box
                            sx={{
                                width: "100%",
                                aspectRatio: "1.5 / 2",
                                minHeight: 250,
                                bgcolor: "#0b5f82",
                                color: "white",
                                borderRadius: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 18,
                                px: 1,
                            }}
                        >
                            작품이미지
                        </Box>
                    </Grid>

                    {/* Right input area */}
                    <Grid item xs={12} md={9} sx={{width:'70%'}}>
                        <Stack spacing={3}>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                                    도서 제목
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="도서 제목을 입력하세요"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    size="medium"
                                />
                            </Box>

                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                                    도서 설명
                                </Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={6}
                                    placeholder="도서 설명을 입력하세요"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>

            {/* Buttons */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate("/")}
                    sx={{
                        bgcolor: "#f5f5f5",
                        borderColor: "#d0d0d0",
                        color: "#333",
                        textTransform: "none",
                    }}
                >
                    취소
                </Button>

                <Button
                    variant="contained"
                    onClick={submitbook}
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : <RefreshIcon />}
                    sx={{
                        bgcolor: "#0b5f82",
                        "&:hover": { bgcolor: "#064f6a" },
                        color: "white",
                        textTransform: "none",
                    }}
                >
                    {isLoading ? "등록 중..." : "등록"}
                </Button>
            </Box>
        </Container>
    );
}