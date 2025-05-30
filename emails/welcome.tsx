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

interface WelcomeProps {
  username: string;
}

const Welcome = ({ username }: WelcomeProps) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>what is BSTS</Preview>
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
              Thank you for signing up for BSTS.
            </Heading>
            <Text style={styles.text}>
              Welcome <span style={{ fontWeight: "bold" }}>{username}</span>
            </Text>
            <Text style={{ color: "#666" }}>
              BSTS <span>(blood sugar tracking system)</span> is a simple
              website that hepls you track and visualize your blood sugar levels
              over time.
            </Text>
            <Text style={{ color: "#666" }}>
              Discover the capabilities, features of our website and more
              through the following link:
            </Text>
            <Button href="https://bsts.vercel.app" style={styles.button}>
              Discover BSTS!
            </Button>
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

export default Welcome;

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
