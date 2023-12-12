"use client";

import Iframe from "react-iframe";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { SimpleLayout } from "../components/SimpleLayout";
import Mermaid from "../components/Mermaid";

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  );
}

function Tool({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  );
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I recommend."
      intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <div className="sketchfab-embed-wrapper">
            <Iframe
              className="w-full"
              title="Northampton Mosque & Islamic Centre"
              // frameBorder="0"
              allowFullScreen
              // mozallowfullscreen="true"
              // webkitallowfullscreen="true"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking
              execution-while-out-of-viewport
              execution-while-not-rendered
              web-share
              url="https://sketchfab.com/models/28230cc1ba484ae2bca23f4bc200ada3/embed"
            ></Iframe>
            <p
              style={{
                fontSize: "13px",
                fontWeight: "normal",
                margin: "5px",
                color: "#4A4A4A",
              }}
            >
              <a
                href="https://sketchfab.com/3d-models/northampton-mosque-islamic-centre-28230cc1ba484ae2bca23f4bc200ada3?utm_medium=embed&utm_campaign=share-popup&utm_content=28230cc1ba484ae2bca23f4bc200ada3"
                target="_blank"
                rel="nofollow"
                style={{ fontWeight: "bold", color: "#1CAAD9" }}
              >
                Northampton Mosque & Islamic Centre
              </a>{" "}
              by{" "}
              <a
                href="https://sketchfab.com/mfhussein?utm_medium=embed&utm_campaign=share-popup&utm_content=28230cc1ba484ae2bca23f4bc200ada3"
                target="_blank"
                rel="nofollow"
                style={{ fontWeight: "bold", color: "#1CAAD9" }}
              >
                mfhussein
              </a>{" "}
              on{" "}
              <a
                href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=28230cc1ba484ae2bca23f4bc200ada3"
                target="_blank"
                rel="nofollow"
                style={{ fontWeight: "bold", color: "#1CAAD9" }}
              >
                Sketchfab
              </a>
            </p>
          </div>
          <Tool title="16” MacBook Pro, M1 Max, 64GB RAM (2021)">
            I was using an Intel-based 16” MacBook Pro prior to this and the
            difference is night and day. I’ve never heard the fans turn on a
            single time, even under the incredibly heavy loads I put it through
            with our various launch simulations.
          </Tool>
          {/*  */}

          <Mermaid
            chart={`
                   gitGraph LR:
       commit
       commit
       branch develop
       commit
       commit
       checkout main
       commit
       commit
       merge develop
       commit
       commit
              `}
          />
        </ToolsSection>
      </div>
    </SimpleLayout>
  );
}
