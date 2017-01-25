---
layout: page
title: Artigos
menutitle: Artigos
permalink: /artigos/
---

<div class="content" id="content">
  {% if site.posts.size == 1 %}
    <h2 class="title" style="text-align: center;">Ainda não tenho nenhum post publicado!</h2>
  {% else %}
    <div id="cards">
      {% for post in site.posts %}
        {% if post.relpage == "artigos" %}
          <div class="card" style="opacity: 1!important;">
            <span class="articleDate">{{ post.date | date_to_string }}</span>
            <a href="{{ post.url }}"><h2>{{ post.title }}</h2></a>
            <a href="{{ post.url }}"><p>{{ post.bio }}</p></a>
            <div class="tags">
              <a href="/{{ post.relpage }}">{{ post.relpage }}</a>
            </div>
          </div>
        {% endif %}
      {% endfor %}
    </div>
  {% endif %}
</div>