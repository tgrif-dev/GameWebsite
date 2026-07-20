package emails

import (
	"bytes"
	"fmt"
	"html"

	"inversionGameWebsite/models"

	"github.com/yuin/goldmark"
)

const siteURL = "https://game-website-nine-blond.vercel.app"

func RenderPost(post models.Post) (string, string, error) {
	var bodyHTML bytes.Buffer
	if err := goldmark.Convert([]byte(post.Body), &bodyHTML); err != nil {
		return "", "", err
	}

	cover := ""
	if post.CoverImage != "" {
		cover = fmt.Sprintf(`<tr><td style="padding:0 0 24px 0;"><img src="%s%s" width="600" style="width:100%%;max-width:600px;display:block;border:0;" alt=""></td></tr>`,
			siteURL, html.EscapeString(post.CoverImage))
	}

	postURL := fmt.Sprintf("%s/blog/%s", siteURL, html.EscapeString(post.Slug))

	full := fmt.Sprintf(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>%s</title>
<style>
body{margin:0;padding:0;background:#f4f4f4;}
h1,h2,h3{font-family:Arial,Helvetica,sans-serif;color:#111111;line-height:1.3;margin:24px 0 12px 0;}
p,li{font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#333333;}
a{color:#1a1a1a;}
img{max-width:100%%;height:auto;}
</style>
</head>
<body>
<table role="presentation" width="100%%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f4;">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%%;max-width:600px;background:#ffffff;">
<tr><td style="padding:32px 32px 0 32px;">
<p style="font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:2px;color:#888888;margin:0 0 24px 0;">INVERSION</p>
</td></tr>
%s
<tr><td style="padding:0 32px 32px 32px;">
<h1 style="font-family:Arial,Helvetica,sans-serif;font-size:26px;color:#111111;margin:0 0 8px 0;">%s</h1>
<p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#888888;margin:0 0 24px 0;">%s</p>
%s
<p style="margin:32px 0 0 0;"><a href="%s" style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#111111;">Read this on the site</a></p>
</td></tr>
<tr><td style="padding:24px 32px;background:#fafafa;border-top:1px solid #eeeeee;">
<p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#999999;margin:0;">You are receiving this because you signed up for Inversion updates.</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`,
		html.EscapeString(post.Title),
		cover,
		html.EscapeString(post.Title),
		post.PublishedAt.Format("2 January 2006"),
		bodyHTML.String(),
		postURL,
	)

	return post.Title, full, nil
}