import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";

/**
 * NewBookPageMUI.jsx
 * - 기존 CSS 기반 NewBookPage를 MUI 컴포넌트/스타일로 완전히 전환한 버전
 * - 레이아웃: 좌측 이미지(프리뷰) + 우측 입력폼, 하단 버튼
 * - 기존 기능(등록 API 호출, 유효성, 네비게이션)은 유지
 *
 * 사용법: 기존 파일 대신 이 컴포넌트를 라우트에 연결하거나 import 해서 사용하세요.
 */

const customColors = {
    primaryPurple: "#6D28D9",
    secondaryPurple: "#5B21B6",
    infoIndigo: "#4F46E5",
    bannerBlue: "#0b5f82",
    backgroundLight: "#F9FAFB"
};

export default function NewBookPageMUI() {
    const navigate = useNavigate();

    // form state
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [coverPreview, setCoverPreview] = useState(null); // local preview or generated URL
    // UI state
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageSeverity, setMessageSeverity] = useState("info");

    // file preview handler (optional)
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const previewUrl = URL.createObjectURL(file);
        setCoverPreview(previewUrl);

        // 추후 서버로 보낼 원본 파일 저장

    };



    const submitbook = async () => {
        if (title.trim() === "") {
            setMessageSeverity("warning");
            setMessage("제목을 입력해주세요.");
            return;
        }

        setIsLoading(true);
        setMessage(null);

        const requestBody = {
            title: title.trim(),
            content: content,
            coverImageUrl: coverPreview
            // cover: coverPreview // 필요하면 포함
        };

        try {
            console.log(coverPreview)

            const response = await fetch("http://localhost:8080/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`HTTP ${response.status} - ${text}`);
            }

            const data = await response.json();
            setMessageSeverity("success");
            setMessage("등록 완료!");
            console.log(data);
            // navigate to update cover page as previously
            //navigate(`/detail/${data.bookId}/updateCover`);
            if(data.coverImageUrl == null) {
                navigate(`/detail/${data.bookId}/updateCover`,{state:{id: data.bookId ,title:title, content:content, image:coverPreview}});

            }else{
                navigate(`/`);
            }
        } catch (err) {
            console.error("등록 중 오류:", err);
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
                py: { xs: 3, md: 5 }
            }}
        >
            {/* Banner */}
            <Paper
                elevation={4}
                sx={{
                    bgcolor: customColors.bannerBlue,
                    color: "common.white",
                    px: 4,
                    py: 1.2,
                    borderRadius: 1,
                    mb: 3
                }}
            >
                <Stack spacing={0.2}>
                    <Typography variant="h5" component="h2">
                        신규 도서 등록
                    </Typography>
                    <Typography variant="body2">새로운 도서 정보 입력</Typography>
                </Stack>
            </Paper>

            {/* Message */}
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
                        backgroundColor: customColors.backgroundLight
                    }}
                >
                    {message}
                </Alert>
            )}

            {/* Main card */}
            <Paper
                elevation={4}
                sx={{
                    border: `2px solid ${customColors.bannerBlue}`,
                    p: { xs: 3, md: 5 }
                }}
            >
                <Grid container spacing={10} alignItems="start">
                    {/* Left: Image preview */}
                    <Grid item xs={12} md={3}>
                        <Box
                            sx={{
                                width: "100%",
                                aspectRatio: { xs: "2 / 3", md: "3 / 4" },
                                minHeight: 250,
                                bgcolor: coverPreview ? "transparent" : customColors.bannerBlue,
                                color: coverPreview ? "inherit" : "white",
                                borderRadius: 2,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                position: "relative",
                                justifyContent: "center",
                                overflow: "hidden",
                                p: 2,
                                boxShadow: 5
                            }}
                        >
                            {coverPreview ? (
                                <Box
                                    component="img"
                                    src={coverPreview}
                                    alt="cover preview"
                                    sx={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: 1
                                    }}
                                />
                            ) : (
                                <Typography variant="h8">등록 시 이미지 생성</Typography>
                            )}

                            <Button
                                variant="contained"
                                component="label"
                                sx={{
                                    mt: 1,
                                    bgcolor: "#064f6a",
                                    "&:hover": { bgcolor: "#053f53" },
                                    fontSize: 13,
                                    textTransform: "none"
                                }}
                                size="small"
                            >
                                이미지 업로드
                                <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                            </Button>
                        </Box>
                    </Grid>

                    {/* Right: Inputs */}
                    <Grid item xs={12} md={9} sx={{width:'75%'}}>
                        <Stack spacing={2}>
                            <Box sx={{ width: "100%" }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                                    도서 제목
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="도서 제목을 입력하세요"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    size="medium"
                                    sx={{ mb: 3 }}
                                />

                                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                                    도서 설명
                                </Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={7}
                                    placeholder="도서 설명을 입력하세요"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </Box>

                            {/* Buttons aligned to right */}
                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 1 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate("/")}
                                    sx={{
                                        bgcolor: "#f5f5f5",
                                        borderColor: "#d0d0d0",
                                        color: "#333",
                                        textTransform: "none"
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
                                        bgcolor: customColors.bannerBlue,
                                        "&:hover": { bgcolor: "#064f6a" },
                                        color: "white",
                                        textTransform: "none"
                                    }}
                                >
                                    {coverPreview ? "등록" : "AI생성페이지"}
                                </Button>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
