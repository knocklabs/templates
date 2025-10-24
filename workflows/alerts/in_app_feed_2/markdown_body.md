{{total_activities}} new {{total_activities | pluralize: "alert", "alerts" }} {{total_activities | pluralize: "was", "were" }} trigged for the **{{event}}** event:

{% for activity in activities %}

<blockquote>
{{ activity.event}} event triggered at {{ activity.inserted_at }}
</blockquote>
{% endfor %}