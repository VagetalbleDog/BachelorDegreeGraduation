import { Anchor } from "antd";
import { marked } from "marked";
import React from "react";

export const markdown = <T extends string>(markdownText: T) => {
  const render = new marked.Renderer();
  const rawList: string[] = [];
  const tocList: any[] = [];
  const { Link } = Anchor;
  render.heading = (text, level, raw) => {
    rawList.push(raw);
    const count = rawList.map((i) => i === raw).length;
    const id = `${raw}-${count}`;
    tocList.push(
      <Link className={`nav-link-${level}`} title={text} href={`#${id}`} />
    );
    return `<h${level} id="${id}">${text}</h${level}>`;
  };
  const html = marked(markdownText, {
    renderer: render,
    gfm: true, //默认为true。 允许 Git Hub标准的markdown.
    breaks: false, //默认为false。 允许回车换行。该选项要求 gfm 为true。
    pedantic: false, //默认为false。 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
    sanitize: false, //对输出进行过滤（清理）
    smartLists: true,
    smartypants: true, //使
  });
  return { html, tocList };
};

export type markdownRT = ReturnType<typeof markdown>;
