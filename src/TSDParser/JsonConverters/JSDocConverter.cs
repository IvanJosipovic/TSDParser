using System.Text.Json.Serialization;
using System.Text.Json;

/// <summary>
/// JSDoc returns a string or array of objects
/// </summary>
internal class JSDocConverter : JsonConverter<List<Node>>
{
    public override List<Node> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType != JsonTokenType.String)
        {
            var converter = (JsonConverter<List<Node>>)options.GetConverter(typeToConvert);
            return converter.Read(ref reader, typeToConvert, options);
        }

        return new List<Node>()
        {
            new JSDocText()
            {
                Text = reader.GetString()
            }
        };
    }

    public override void Write(Utf8JsonWriter writer, List<Node> value, JsonSerializerOptions options)
    {
        JsonSerializer.Serialize(writer, value, options);
    }
}
