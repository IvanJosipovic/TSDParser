using System.Text.Json.Serialization;

namespace TSDParser.Class
{
    public class JSDocParameterTag : Node
    {
        public Identifier TagName { get; set; }

        [JsonConverter(typeof(JSDocConverter))]
        public List<Node>? Comment { get; set; }

        public Identifier Name { get; set; }

        public bool IsNameFirst { get; set; }

        public bool IsBracketed { get; set; }
    }
}
