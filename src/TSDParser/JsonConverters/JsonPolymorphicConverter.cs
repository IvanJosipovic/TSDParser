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

    //public override bool CanConvert(Type typeToConvert) => typeof(TBaseType).IsAssignableFrom(typeToConvert) && typeToConvert != typeof(TBaseType);

    public override TBaseType? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        using var jsonDoc = JsonDocument.ParseValue(ref reader);

        int typeDiscriminator = jsonDoc.RootElement
            .GetProperty(_discriminatorPropertyName)
            .GetInt32()!;

        var @enum = ((SyntaxKind)typeDiscriminator);

        Type type = GetType().Assembly.GetTypes().FirstOrDefault(x => x.Name == @enum.ToString());

        if (type == null)
        {
            type = typeof(TBaseType);

            return (TBaseType?)jsonDoc.Deserialize(type, RemoveThisFromOptions(options));
        }

        return (TBaseType?)jsonDoc.Deserialize(type, options);
    }

    public override void Write(Utf8JsonWriter writer, TBaseType value, JsonSerializerOptions options)
    {
        var type = value!.GetType();
        writer.WriteStartObject();

        using var jsonDoc = JsonSerializer.SerializeToDocument(value, type, options);
        foreach (var prop in jsonDoc.RootElement.EnumerateObject())
        {
            writer.WritePropertyName(prop.Name);
            prop.Value.WriteTo(writer);
        }

        writer.WriteEndObject();
    }

    private JsonSerializerOptions RemoveThisFromOptions(JsonSerializerOptions options)
    {
        JsonSerializerOptions newOptions = new(options);
        newOptions.Converters.Remove(this); // NOTE: We'll get an infinite loop if we don't do this
        return newOptions;
    }
}