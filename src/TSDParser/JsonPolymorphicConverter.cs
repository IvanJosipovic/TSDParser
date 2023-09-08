using System.Text.Json.Serialization;
using System.Text.Json;

namespace TSDParser;
public class JsonPolymorphicConverter<TBaseType> : JsonConverter<TBaseType>
{
    private readonly string _discriminatorPropertyName;

    public JsonPolymorphicConverter(string discriminatorPropertyName)
    {
        _discriminatorPropertyName = discriminatorPropertyName;
    }

    public override bool CanConvert(Type typeToConvert) => typeToConvert.IsAssignableFrom(typeof(TBaseType));

    public override TBaseType? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        using var jsonDoc = JsonDocument.ParseValue(ref reader);

        int typeDiscriminator = jsonDoc.RootElement
            .GetProperty(_discriminatorPropertyName)
            .GetInt32()!;

        var @enum = ((SyntaxKind)typeDiscriminator);

        var type = GetType().Assembly.GetTypes().First(x => x.Name == @enum.ToString());
        return (TBaseType?)jsonDoc.Deserialize(type, options);
    }

    public override void Write(Utf8JsonWriter writer, TBaseType value, JsonSerializerOptions options)
    {
        var type = value!.GetType();
        writer.WriteStartObject();

        //writer.WriteNumber(_discriminatorPropertyName, _subtypeToDiscriminator[type]);

        using var jsonDoc = JsonSerializer.SerializeToDocument(value, type, options);
        foreach (var prop in jsonDoc.RootElement.EnumerateObject())
        {
            writer.WritePropertyName(prop.Name);
            prop.Value.WriteTo(writer);
        }

        writer.WriteEndObject();
    }
}