import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Hr,
  Img,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  userName: string;
  resetLink: string;
}

const ResetPasswordEmail = ({
  userName,
  resetLink,
}: ResetPasswordEmailProps) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>Reset your BSTS account password</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Img
              src="https://i.ibb.co/7tDkmcLK/final.png"
              alt="BSTS Logo"
              width="55px"
              height="55px"
              style={{ margin: "auto" }}
            />
            <Hr style={styles.hr} />
            <Heading as="h1" style={styles.heading}>
              Reset your password
            </Heading>
            <Text style={styles.text}>
              Hi <span style={{ fontWeight: "bold" }}>{userName}</span>
            </Text>
            <Text style={{ color: "#666" }}>
              we received a request to reset your password for BSTS account.
              Click the button below to proceed.
            </Text>
            <Button href={resetLink} style={styles.button}>
              Reset Password
            </Button>
            <Text style={styles.textSmall}>
              If you didn't request this, you can safely ignore this email. To
              keep your account secure, please don&apos;t forward this email to
              anyone
            </Text>
            <Text style={styles.textSmall}>
              If you experience any issues with the button above, copy and paste
              the URL below into your web browser.
            </Text>
            <Text style={{ marginTop: "4px", fontSize: "11px" }}>
              {resetLink}
            </Text>
            <Text style={styles.textSmall}>Happy Day!</Text>
            <Hr style={styles.hr} />
            <Text style={styles.footerText}>
              &copy; 2025{" "}
              <a
                href="https://www.github.com/mohamedaridah"
                style={{ textDecoration: "none" }}
              >
                @fedlover
              </a>
              . BSTS &trade; All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetPasswordEmail;

const styles = {
  body: {
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica, Arial, sans-serif",
    padding: "40px 0",
  },
  container: {
    maxWidth: "580px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    border: "1px solid #eaeaea",
    borderRadius: "8px",
    padding: "32px",
  },
  header: {
    textAlign: "left" as const,
  },
  heading: {
    fontSize: "24px",
    fontWeight: 600,
    margin: "0 0 16px",
    color: "#111111",
  },
  text: {
    fontSize: "16px",
    color: "#444",
    margin: "0 0 24px",
    lineHeight: "1.6",
  },
  textSmall: {
    fontSize: "14px",
    color: "#888",
    margin: "24px 0 0",
  },
  button: {
    display: "inline-block",
    padding: "12px 20px",
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: 500,
    textDecoration: "none",
  },
  hr: {
    borderColor: "#eaeaea",
    margin: "32px 0",
  },
  footerText: {
    fontSize: "14px",
    color: "#888",
    textAlign: "center" as const,
  },
};
